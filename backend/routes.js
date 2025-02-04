// backend/routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { validateEmail, validatePassword, authenticate } = require('./middlewares');

router.post('/register', validateEmail, validatePassword, (req, res) => {
    const users = JSON.parse(fs.readFileSync('backend/users.json'));
    users.push(req.body);
    fs.writeFileSync('backend/users.json', JSON.stringify(users, null, 2));
    res.status(201).send('User registered successfully');
});

router.post('/login', validateEmail, validatePassword, (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync('backend/users.json'));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.status(200).json({ token: 'valid-token' });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

router.post('/add-task', authenticate, (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('backend/tasks.json'));
    if (!req.body.title) {
        return res.status(400).send('Task title cannot be empty');
    }
    tasks.push(req.body);
    fs.writeFileSync('backend/tasks.json', JSON.stringify(tasks, null, 2));
    res.status(201).send('Task added successfully');
});

router.delete('/delete-task/:id', authenticate, (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('backend/tasks.json'));
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).send('Task not found');
    }
    if (task.userId !== req.body.userId) {
        return res.status(403).send('Cannot delete task of another user');
    }
    tasks = tasks.filter(t => t.id !== req.params.id);
    fs.writeFileSync('backend/tasks.json', JSON.stringify(tasks, null, 2));
    res.send('Task deleted successfully');
});

module.exports = router;