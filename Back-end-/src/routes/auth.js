const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Usuarios = require("../models/petShopModels").Usuarios;
const PasswordReset = require("../models/PasswordReset");
const authController = require("../controllers/authController");
const router = express.Router();

exports.recover = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar usuario
    const user = await Usuarios.findOne({ correoElectronico: email });
    if (!user) {
      return res.json({ message: "Si el correo existe, se enviará un enlace." });
    }

    // Generar token y guardarlo en DB
    const token = uuidv4();
    await PasswordReset.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 3600000) // 1 hora
    });

    // Construir enlace de reset
    const resetUrl = `http://localhost:5000/reset-password?token=${token}`;

    // Simular envío de correo
    console.log("📧 Simulación de envío de correo:");
    console.log(`Para: ${email}`);
    console.log(`Enlace de recuperación: ${resetUrl}`);

    // Responder al frontend
    res.json({
      message: "Simulación: enlace de recuperación generado.",
      resetUrl
    });
  } catch (err) {
    console.error("❌ Error en recover:", err);
    res.status(500).json({ error: err.message });
  }
};


// 2. Resetear contraseña
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const reset = await PasswordReset.findOne({ token, usado: false });
    if (!reset || reset.expiresAt < new Date()) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    // Aquí usamos el campo correcto: userId
    await Usuarios.findByIdAndUpdate(reset.userId, { contrasena: hashed });

    reset.usado = true;
    await reset.save();

    res.json({ message: "Contraseña actualizada correctamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", authController.registerUser);
router.post("/recover", authController.recover);
router.post("/change-password", authController.changePassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
