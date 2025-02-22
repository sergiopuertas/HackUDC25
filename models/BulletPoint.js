// Importar mongoose
import mongoose from 'mongoose';

const BulletPointSchema = new mongoose.Schema({
    topic: { 
        type: String, 
        required: [true, "La emocion es obligatoria"]
    },
    userId: {
        type: Number,
        required: [true, "El usuario es necesario"]
    }
});



const BulletPoint = mongoose.model('BulletPoint', BulletPointSchema);


// Exportar el modelo para usarlo en las rutas

export default BulletPoint;


