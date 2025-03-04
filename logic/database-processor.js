const mysql = require('mysql2');
require('dotenv').config();

class DatabaseProcessor {
    constructor() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME 
        });

        this.connection = {
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this)
        };

        this.tables = {
            create: this.createTable.bind(this),
            remove: this.removeTable.bind(this)
        };

        this.data = {
            add: this.addData.bind(this),
            remove: this.removeData.bind(this),
            get: this.getData.bind(this),
            update: this.updateData.bind(this)
        };
    }

    connect() {
        this.db.connect(err => {
            if (err) {
                console.error('Error connecting to the database:', err);
                return;
            }
            console.log('Connected to the database');
        });
    }

    disconnect() {
        this.db.end(err => {
            if (err) {
                console.error('Error disconnecting from the database:', err);
                return;
            }
            console.log('Disconnected from the database');
        });
    }

    createTable(tableName, columns) {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                ${columns.join(', ')}
            ) Engine=InnoDB DEFAULT CHARSET=utf8;
        `;
        this.db.query(createTableQuery, (err, results) => {
            if (err) {
                console.error(`Error creating the ${tableName} table:`, err);
                return;
            }
            console.log(`${tableName} table created successfully`);
        });
    }

    removeTable(tableName) {
        const removeTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
        this.db.query(removeTableQuery, (err, results) => {
            if (err) {
                console.error(`Error removing the ${tableName} table:`, err);
                return;
            }
            console.log(`${tableName} table removed successfully`);
        });
    }

    addData(tableName, data) {
        const addDataQuery = `INSERT INTO ${tableName} SET ?`;
        try {
            const [results] = this.db.query(addDataQuery, data);
            console.log(`Data added to the ${tableName} table successfully`);
            return results.insertId;
        } catch (err) {
            console.error(`Error adding data to the ${tableName} table:`, err);
            throw err;
        }
    }

    removeData(tableName, data) {
        const removeDataQuery = `
            DELETE FROM ${tableName} WHERE ?
        `;
        this.db.query(removeDataQuery, data, (err, results) => {
            if (err) {
                console.error(`Error removing data from the ${tableName} table:`, err);
                return;
            }
            console.log(`Data removed from the ${tableName} table successfully`);
        });
    }

    getData(tableName, data) {
        return new Promise((resolve, reject) => {
            let getDataQuery;
            let queryParams;
    
            if (data && Object.keys(data).length > 0) {
                getDataQuery = `SELECT * FROM ${tableName} WHERE ?`;
                queryParams = data;
            } else {
                getDataQuery = `SELECT * FROM ${tableName}`;
                queryParams = [];
            }
    
            this.db.query(getDataQuery, queryParams, (err, results) => {
                if (err) {
                    console.error(`Error getting data from the ${tableName} table:`, err);
                    return reject(err);
                }
                console.log(`Data retrieved from the ${tableName} table successfully`);
                resolve(results);
            });
        });
    }

    updateData(tableName, data) {
        const updateDataQuery = `
            UPDATE ${tableName} SET ? WHERE ?
        `;
        this.db.query(updateDataQuery, data, (err, results) => {
            if (err) {
                console.error(`Error updating data in the ${tableName} table:`, err);
                return;
            }
            console.log(`Data updated in the ${tableName} table successfully`);
        });
    }
}

module.exports = DatabaseProcessor;