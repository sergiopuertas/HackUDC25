// Importar mongoose
import mongoose from "mongoose";

// Definir el esquema del usuario
const ConversationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    get: (val) => val.toLocaleDateString("es-ES"),
  },
  user: {
    type: String,
    required: [true, "El id del usuario es obligatorio"],
  },
  advice: {
    type: String,
    required: [true, "El consejo completo es obligatorio"],
  },
  emotion: {
    type: String,
    required: [true, "La emoción completo es obligatorio"],
  },
  summary: {
    type: String,
    required: [true, "El resumen completo es obligatorio"],
  },
  bulletpoints: {
    type: [String],
  },
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
});

// Crear el modelo Usuario basado en el esquema
const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);

// Exportar el modelo para usarlo en las rutas

export default Conversation;
