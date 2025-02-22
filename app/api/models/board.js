// Importar mongoose
const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    emotionFinal: { 
        type: String, 
        required: [true, "La emocion es obligatoria"],
    },
    problems: { 
        type: [mongoose.Schema.Types.ObjectId],
                    ref: 'Problem',
        default: [] 
    },
    userId: {
        typer:Number,
        required:[true, "El usuario es necesario"]
    }
});




const Board = mongoose.model('Board', BoardSchema);

// Exportar el modelo para usarlo en las rutas
module.exports = Board;


