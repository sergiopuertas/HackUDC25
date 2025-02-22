// Importar mongoose
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    emotion: { 
        type: String, 
        required: [true, "La emocion es obligatoria"],
    },
    text: { 
        type: String, 
        required: [true, "El texto completo es obligatorio"] 
    }
});

// Crear el modelo Usuario basado en el esquema
const Note = mongoose.model('Note', NoteSchema);


// Exportar el modelo para usarlo en las rutas
module.exports = Note;

export default Note;
