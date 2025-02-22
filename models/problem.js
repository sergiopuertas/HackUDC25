import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
    summary: { 
        type: String, 
        required: [true, "El resumen es obligatorio"],
    },
    full: { 
        type: String, 
        required: [true, "El problema completo es obligatorio"] 
    },
    emotion: { 
        type: String, 
        required: [true, "El problema completo es obligatorio"] 
    }
});
const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;

export default Problem;