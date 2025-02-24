// Importar mongoose
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    match: [/.+@.+\..+/, "El email no es válido"],
  },
  agreeableness: {
    type: Number,
    required: [false, "Las valoraciones son obligatorias"],
    min: [1, "El valor minimo es 1"],
    max: [100, "El valor máximo es 100"],
  },
  conscientiousness: {
    type: Number,
    required: [false, "Las valoraciones son obligatorias"],
    min: [1, "El valor minimo es 1"],
    max: [100, "El valor máximo es 100"],
  },
  extraversion: {
    type: Number,
    required: [false, "Las valoraciones son obligatorias"],
    min: [1, "El valor minimo es 1"],
    max: [100, "El valor máximo es 100"],
  },
  neuroticism: {
    type: Number,
    required: [false, "Las valoraciones son obligatorias"],
    min: [1, "El valor minimo es 1"],
    max: [100, "El valor máximo es 100"],
  },
  openness: {
    type: Number,
    required: [false, "Las valoraciones son obligatorias"],
    min: [1, "El valor minimo es 1"],
    max: [100, "El valor máximo es 100"],
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [4, "La contraseña debe tener al menos 4 caracteres"],
  },
});
// Hash password antes de guardar
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// Método para comparar passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Crear el modelo Usuario basado en el esquema
export default mongoose.models.User || mongoose.model("User", UserSchema);
