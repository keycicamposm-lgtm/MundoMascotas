const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const getAllRoutes = require("./src/routes/getall");
const authRoutes = require("./src/routes/auth");
const loginRoutes = require("./src/routes/login"); // 👈 AGREGAR ESTO

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// CORS para desarrollo (opcional pero recomendado)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api", getAllRoutes);
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/auth", loginRoutes); // 👈 AGREGAR ESTO

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

app.get("/", (req, res) => res.send("API funcionando 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Para las Api's http://localhost:${PORT}/api/`);
});
