const express = require("express");
const bcrypt = require("bcrypt");
const { Usuarios } = require("../models/petShopModels");
const router = express.Router();

// 🔐 LOGIN endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // username es el correo

  try {
    // Buscar usuario por correo
    const user = await Usuarios.findOne({ 
      correoElectronico: username 
    }).populate("rol");

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Login exitoso
    res.json({
      message: "Login exitoso",
      user: {
        id: user._id,
        nombre: user.nombreUsuario,
        apellido: user.apellidoUsuario,
        email: user.correoElectronico,
        rol: user.rol.nombreRol
      }
    });

  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;