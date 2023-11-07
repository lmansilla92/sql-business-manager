const db = 
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PASSWORD,
      // Database to connect to
      database: 'business_db'
    };

module.exports = db;