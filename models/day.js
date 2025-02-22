// Importar mongoose
import mongoose from 'mongoose';

const DaySchema = new mongoose.Schema({
    emotionFinal: { 
        type: String, 
        required: [true, "La emocion es obligatoria"],
    },
    date: { 
        type: Date,
        default: Date.now 
    },
    notes:{
        type: [mongoose.Schema.Types.ObjectId],
                            ref: 'Note', 
                default: []
    },
    userId:{
        type: Number,
        required : [true, "El id del usuario es obligatorio"]
    }
});

// Crear el modelo Usuario basado en el esquema
const Day = mongoose.model('Day', DaySchema);


// Exportar el modelo para usarlo en las rutas
module.exports = Day;

export default Day;
