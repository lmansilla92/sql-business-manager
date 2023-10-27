const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    // Uses process.env to retrieve the name, user, password from the hidden .env file
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    database='business_db',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;