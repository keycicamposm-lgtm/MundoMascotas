const express = require("express");
const router = express.Router();
const controller = require("../controllers/getAllControllers");

router.get("/roles", controller.getRoles);
router.get("/usuarios", controller.getUsuarios);
router.get("/direcciones", controller.getDirecciones);
router.get("/publicaciones", controller.getPublicaciones);
router.get("/comentarios", controller.getComentarios);
router.get("/reacciones", controller.getReacciones);
router.get("/hilos", controller.getHilos);
router.get("/respuestas-hilo", controller.getRespuestasHilo);
router.get("/solicitudes-amistad", controller.getSolicitudesAmistad);
router.get("/amistades", controller.getAmistades);

module.exports = router;
