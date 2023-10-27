// Ensures dotenv runs before everything else
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});