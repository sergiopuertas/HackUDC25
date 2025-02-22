const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📌 Crear un nuevo user (POST /users)
router.post('/', async (req, res) => {
    try {
        const nuevoUser = new User(req.body);
        await nuevoUser.save();
        res.status(201).json(nuevoUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* 📌 Obtener todos los users (GET /users)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

// 📌 Obtener un user por ID (GET /users/:id)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar un user (PUT /users/:id)
router.put('/:id', async (req, res) => {
    try {
        const userActualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!userActualizado) return res.status(404).json({ error: 'User no encontrado' });
        res.json(userActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Eliminar un user (DELETE /users/:id)
router.delete('/:id', async (req, res) => {
    try {
        const userEliminado = await User.findByIdAndDelete(req.params.id);
        if (!userEliminado) return res.status(404).json({ error: 'User no encontrado' });
        res.json({ mensaje: 'User eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
