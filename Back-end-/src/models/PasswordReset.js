const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  usado: { type: Boolean, default: false }
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);
