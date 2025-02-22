const express = require('express');
const router = express.Router();
const Day = require('../models/Day');

// 📌 Crear un nuevo board (POST /boards)
router.post('/', async (req, res) => {
    try {
        const nuevoDay = new Day(req.body);
        await nuevoDay.save();
        res.status(201).json(nuevoDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Obtener todos los boards (GET /boards)
router.get('/', async (req, res) => {
    try {
        const days = await Day.find();
        res.json(days);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener un board por ID (GET /boards/:id)
router.get('/:id', async (req, res) => {
    try {
        const day = await Day.findById(req.params.id);
        if (!day) return res.status(404).json({ error: 'day no encontrado' });
        res.json(day);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener conversaciones por userId (GET /conversations/user/:userId)
router.get('/user/:userId', async (req, res) => {
    try {
        const days = await Day.find({ userId: req.params.userId });
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
        const dayActualizado = await Day.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!dayActualizado) return res.status(404).json({ error: 'board no encontrado' });
        res.json(dayActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Eliminar un board (DELETE /boards/:id)
router.delete('/:id', async (req, res) => {
    try {
        const dayEliminado = await Day.findByIdAndDelete(req.params.id);
        if (!dayEliminado) return res.status(404).json({ error: 'board no encontrado' });
        res.json({ mensaje: 'board eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
