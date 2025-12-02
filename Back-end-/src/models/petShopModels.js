//Esquemas, se requiere usuarios
const mongoose = require('mongoose');

// 1. Roles
const rolSchema = new mongoose.Schema({
    nombreRol: { type: String, required: true }
});
const Roles = mongoose.model('Roles', rolSchema);

// 2. Usuarios
const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true },
    apellidoUsuario: { type: String, required: true },
    correoElectronico: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    telefonoUsuario: { type: String },
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true }
});
const Usuarios = mongoose.model('Usuarios', usuarioSchema);

// 3. Direcciones
const direccionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    provincia: { type: String },
    canton: { type: String },
    distrito: { type: String },
    detalleDireccion: { type: String }
});
const Direcciones = mongoose.model('Direcciones', direccionSchema);

// 4. Publicaciones
const publicacionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    contenidoTexto: { type: String },
    imagenURL: { type: String },
    fechaPublicacion: { type: Date, default: Date.now }
});
const Publicaciones = mongoose.model('Publicaciones', publicacionSchema);

// 5. Comentarios
const comentarioSchema = new mongoose.Schema({
    publicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicaciones', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    contenidoComentario: { type: String, required: true },
    fechaComentario: { type: Date, default: Date.now }
});
const Comentarios = mongoose.model('Comentarios', comentarioSchema);

// 6. Reacciones
const reaccionSchema = new mongoose.Schema({
    publicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicaciones', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    tipoReaccion: { type: String, default: 'Me gusta' },
    fechaReaccion: { type: Date, default: Date.now }
});
reaccionSchema.index({ publicacion: 1, usuario: 1 }, { unique: true });
const Reacciones = mongoose.model('Reacciones', reaccionSchema);

// 7. Hilos
const hiloSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    tituloHilo: { type: String, required: true },
    contenidoHilo: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});
const Hilos = mongoose.model('Hilos', hiloSchema);

// 8. RespuestasHilo
const respuestaHiloSchema = new mongoose.Schema({
    hilo: { type: mongoose.Schema.Types.ObjectId, ref: 'Hilos', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    contenidoRespuesta: { type: String, required: true },
    fechaRespuesta: { type: Date, default: Date.now }
});
const RespuestasHilo = mongoose.model('RespuestasHilo', respuestaHiloSchema);

// 9. SolicitudesAmistad
const solicitudAmistadSchema = new mongoose.Schema({
    solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    estadoSolicitud: { type: String, enum: ['Pendiente','Aceptada','Rechazada'], default: 'Pendiente' },
    fechaSolicitud: { type: Date, default: Date.now }
});
solicitudAmistadSchema.index({ solicitante: 1, receptor: 1 }, { unique: true });
const SolicitudesAmistad = mongoose.model('SolicitudesAmistad', solicitudAmistadSchema);

// 10. Amistades
const amistadSchema = new mongoose.Schema({
    usuario1: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    usuario2: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    fechaAmistad: { type: Date, default: Date.now }
});
amistadSchema.index({ usuario1: 1, usuario2: 1 }, { unique: true });
const Amistades = mongoose.model('Amistades', amistadSchema);


// Exportar modelos
module.exports = {
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
};