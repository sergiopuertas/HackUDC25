// Importar mongoose
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    user: { 
        type: Boolean, 
        required: [true, "Es necesario saber si el mensaje fue escrito por el usuario o no"],
    },
    text: { 
        type: String, 
        required: [true, "El texto completo es obligatorio"] 
    }
});

const Message = mongoose.model('Message', MessageSchema);

// Exportar el modelo para usarlo en las rutas
module.exports = Message;


