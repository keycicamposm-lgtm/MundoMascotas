const {
  Roles,
  Usuarios,
  Direcciones,
  Publicaciones,
  Comentarios,
  Reacciones,
  Hilos,
  RespuestasHilo,
  SolicitudesAmistad,
  Amistades
} = require("../models/petShopModels");

exports.getRoles = async (req, res) => {
  try {
    const data = await Roles.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const data = await Usuarios.find().populate("rol");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDirecciones = async (req, res) => {
  try {
    const data = await Direcciones.find().populate("usuario");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPublicaciones = async (req, res) => {
  try {
    const data = await Publicaciones.find().populate("usuario");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComentarios = async (req, res) => {
  try {
    const data = await Comentarios.find().populate("usuario").populate("publicacion");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReacciones = async (req, res) => {
  try {
    const data = await Reacciones.find().populate("usuario").populate("publicacion");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHilos = async (req, res) => {
  try {
    const data = await Hilos.find().populate("usuario");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRespuestasHilo = async (req, res) => {
  try {
    const data = await RespuestasHilo.find().populate("usuario").populate("hilo");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSolicitudesAmistad = async (req, res) => {
  try {
    const data = await SolicitudesAmistad.find().populate("solicitante").populate("receptor");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAmistades = async (req, res) => {
  try {
    const data = await Amistades.find().populate("usuario1").populate("usuario2");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
