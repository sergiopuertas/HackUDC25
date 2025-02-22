// Importar mongoose
import mongoose from 'mongoose';

// Definir el esquema del usuario
const ConversationSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    userId:{
        type: Number,
        required : [true, "El id del usuario es obligatorio"]
    },
    advice: { 
        type: String, 
        required: [true, "El consejo completo es obligatorio"] 
    },
    emotion: { 
        type: String, 
        required: [true, "La emoción completo es obligatorio"] 
    },
    summary: { 
        type: String, 
        required: [true, "El resumen completo es obligatorio"] 
    },
    bulletpoints:{
        type: [String]
    }
});

// Crear el modelo Usuario basado en el esquema
const Conversation = mongoose.model('Conversation', ConversationSchema);


// Exportar el modelo para usarlo en las rutas

export default Conversation;
