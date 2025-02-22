// Importar mongoose
import mongoose from 'mongoose';

// Definir el esquema del usuario
const ConversationSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    messages: { 
        type: [mongoose.Schema.Types.ObjectId],
                    ref: 'Message', 
        default: [] 
    },
    userId:{
        type: Number,
        required : [true, "El id del usuario es obligatorio"]
    }
});

// Crear el modelo Usuario basado en el esquema
const Conversation = mongoose.model('Conversation', ConversationSchema);


// Exportar el modelo para usarlo en las rutas
module.exports = Conversation;


