require('dotenv').config();
const DataBaseModel = require('../models/database-model');
const mysql = require('mysql2');

const databaseModel = DataBaseModel;

class DatabaseProcessor {
    constructor() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        this.connection = {
            connect: () => {
                return new Promise((resolve, reject) => {
                    this.db.connect(err => {
                        if (err) {
                            return reject(err);
                        }
                        resolve('Connected to the database');
                    });
                });
            },
    
            disconnect: () => {
                return new Promise((resolve, reject) => {
                    this.db.end(err => {
                        if (err) {
                            return reject(err);
                        }
                        resolve('Disconnected from the database');
                    });
                });
            },
        }
    
        this.tables = {
            create: (tableName, columns) => {
                return new Promise((resolve, reject) => {
                    const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS ${tableName} (
                    ${columns.join(', ')}
                    ) Engine=InnoDB DEFAULT CHARSET=utf8;
                     `;
                     this.db.query(createTableQuery, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(tableName);
                    });
                });
            },
    
            remove: (tableName) => {
                return new Promise((resolve, reject) => {
                    const removeTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
                    this.db.query(removeTableQuery, (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(tableName);
                    });
                });
            }
        }
    
        this.data = {
            add: (model) => {
                return new Promise((resolve, reject) => {
                    const { tableName, data } = model;
                    const query = `INSERT INTO ${tableName} SET ?`;
                    this.db.query(query, data, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results.insertId);
                    });
                })
            },

            remove: (tableName, data) => {
                return new Promise((resolve, reject) => {
                    const removeDataQuery = `
                    DELETE FROM ${tableName} WHERE ?
                    `;
                    this.db.query(removeDataQuery, data, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(`${tableName} removed successfully`);
                    });
                });
            },
            
            // Get data from the database
            // tableName: The name of the table to get data from
            // dataType: The type of data to send in the query (e.g. 'username', 'email', etc.)
            // dataValue: The value of the data to send in the query (e.g. 'john_doe', '
            // returnType: The type of data that you want returned (e.g. 'username', 'email', etc.)
            // returnValue: The value of the data that you want returned (e.g. 'john_doe', '

            get: (model) => {
                return new Promise((resolve, reject) => {
                    const { tableName, data, returnType = [] } = model;
                    let query;
                    let queryParams =[];

                    if (data && data.type && data.value) {
                        const dataType = data.type;
                        const dataValue = data.value;

                        if (returnType.length > 0) {
                            query = `SELECT ${returnType.join(', ')} FROM ${tableName} WHERE ${dataType} = ?`;
                        } else {
                            query = `SELECT * FROM ${tableName} WHERE ${dataType} = ?`;
                        }
                        queryParams = [dataValue];
                    } else {
                        if (returnType.length > 0) {
                            query = `SELECT ${returnType.join(', ')} FROM ${tableName}`;
                        } else {
                            query = `SELECT * FROM ${tableName}`;
                        }
                    }
                    
                    this.db.query(query, queryParams, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results);
                    });
                });
            },
    
            update: (tableName, data) =>{
                return new Promise((resolve, reject) => {
                    const updateDataQuery = `
                    UPDATE ${tableName} SET ? WHERE ?
                    `;
                    this.db.query(updateDataQuery, data, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(`${tableName} updated successfully`);
                    });
                });
            }
        }
    }
}

module.exports = DatabaseProcessor;