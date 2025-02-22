import express from 'express';
const router = express.Router();
import Board from'../models/Board';

// 📌 Crear un nuevo board (POST /boards)
router.post('/', async (req, res) => {
    try {
        const nuevoBoard = new Board(req.body);
        await nuevoBoard.save();
        res.status(201).json(nuevoBoard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Obtener todos los boards (GET /boards)
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener un board por ID (GET /boards/:id)
router.get('/:id', async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) return res.status(404).json({ error: 'board no encontrado' });
        res.json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener conversaciones por userId (GET /conversations/user/:userId)
router.get('/user/:userId', async (req, res) => {
    try {
        const boards = await Board.find({ userId: req.params.userId });
        if (!boards || boards.length === 0) {
            return res.status(404).json({ error: 'No se encontraron conversaciones para este userId' });
        }
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar un board (PUT /boards/:id)
router.put('/:id', async (req, res) => {
    try {
        const boardActualizado = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!boardActualizado) return res.status(404).json({ error: 'board no encontrado' });
        res.json(boardActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Eliminar un board (DELETE /boards/:id)
router.delete('/:id', async (req, res) => {
    try {
        const boardEliminado = await Board.findByIdAndDelete(req.params.id);
        if (!boardEliminado) return res.status(404).json({ error: 'board no encontrado' });
        res.json({ mensaje: 'board eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
