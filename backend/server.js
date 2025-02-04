// backend/server.js
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.listen(3001, () => console.log('Server running on port 3001'));
