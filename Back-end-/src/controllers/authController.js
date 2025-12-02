const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { Usuarios, Roles } = require("../models/petShopModels");
const PasswordReset = require("../models/PasswordReset");

exports.registerUser = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { nombreUsuario, apellidoUsuario, correoElectronico, contrasena, rol } = req.body;

  try {
    const existing = await Usuarios.findOne({ correoElectronico });
    if (existing) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashed = await bcrypt.hash(contrasena, 10);

    let rolDoc = await Roles.findOne({ nombreRol: rol });
    if (!rolDoc) {
      rolDoc = await Roles.create({ nombreRol: rol });
    }

    const user = await Usuarios.create({
      nombreUsuario,       
      apellidoUsuario,     
      correoElectronico,
      contrasena: hashed,
      rol: rolDoc._id
    });

    res.json({ message: "Usuario registrado correctamente", user });
  } catch (err) {
    console.error("❌ Error en registerUser:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await Usuarios.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ error: "La contraseña actual es incorrecta" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.contrasena = hashed;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recover = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar usuario por correo
    const user = await Usuarios.findOne({ correoElectronico: email });
    if (!user) {
      return res.json({ message: "Si el correo existe, se enviará un enlace." });
    }

    // Generar token único
    const token = uuidv4();

    // Guardar token en la colección PasswordReset
    await PasswordReset.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 24 * 3600000) // válido por 24 horas
    });

    // Construir enlace de reset
    const resetUrl = `http://localhost:5000/reset-password?token=${token}`;

    // Simular envío de correo
    console.log("📧 Simulación de envío de correo:");
    console.log(`Para: ${email}`);
    console.log(`Enlace de recuperación: ${resetUrl}`);

    // Responder al cliente
    res.json({
      message: "Simulación: enlace de recuperación generado.",
      resetUrl
    });
  } catch (err) {
    console.error("❌ Error en recover:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const reset = await PasswordReset.findOne({ token });
    if (!reset || reset.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    const user = await Usuarios.findById(reset.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.contrasena = hashed;
    await user.save();

    await PasswordReset.deleteOne({ token });

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

