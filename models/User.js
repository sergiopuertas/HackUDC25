// Importar mongoose
import mongoose from "mongoose";

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
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

// Crear el modelo Usuario basado en el esquema
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
