import express  from 'express';
const router = express.Router();
import Conversation from '../models/Conversation';

// 📌 Crear un nuevo board (POST /boards)
router.post('/', async (req, res) => {
    try {
        const nuevoConv = new Conversation(req.body);
        await nuevoConv.save();
        res.status(201).json(nuevoConv);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Obtener todos los boards (GET /boards)
router.get('/', async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener un board por ID (GET /boards/:id)
router.get('/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) return res.status(404).json({ error: 'board no encontrado' });
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener conversaciones por userId (GET /conversations/user/:userId)
router.get('/user/:userId', async (req, res) => {
    try {
        const conversations = await Conversation.find({ userId: req.params.userId });
        if (!conversations || conversations.length === 0) {
            return res.status(404).json({ error: 'No se encontraron conversaciones para este userId' });
        }
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar un board (PUT /boards/:id)
router.put('/:id', async (req, res) => {
    try {
        const convActualizado = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!convActualizado) return res.status(404).json({ error: 'board no encontrado' });
        res.json(convActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Eliminar un board (DELETE /boards/:id)
router.delete('/:id', async (req, res) => {
    try {
        const convEliminado = await Conversation.findByIdAndDelete(req.params.id);
        if (!convEliminado) return res.status(404).json({ error: 'board no encontrado' });
        res.json({ mensaje: 'board eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
