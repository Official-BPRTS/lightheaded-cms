const mysql = require('mysql2');
require('dotenv').config();

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) Engine=InnoDB DEFAULT CHARSET=utf8;
             `;
             this.connection.query(createTableQuery, (err, results) => {
                    if (err) {
                        console.error('Error creating the users table:', err);
                        return;
                    }
                    console.log('Users table created successfully');
                });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to the database:', err);
                    return reject(err);
                }
                console.log('Connected to the database');
                resolve();
            });
        });
    }

    async checkUserTable() {
        try {
            const [rows] = await this.connection.promise().query('SELECT COUNT(*) AS count FROM users');
            return rows[0].count > 0;
        } catch (err) {
            console.error('Error checking for users:', err);
            throw err;
        }
    }
}

module.exports = Database;