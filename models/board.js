// Importar mongoose
import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
    emotionFinal: { 
        type: String, 
        required: [true, "La emocion es obligatoria"],
    },
    
        problems: [{ 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Problem' 
                }],
    userId: {
        type: Number,
        required: [true, "El usuario es necesario"]
    }
});



const Board = mongoose.model('Board', BoardSchema);


// Exportar el modelo para usarlo en las rutas

export default Board;


