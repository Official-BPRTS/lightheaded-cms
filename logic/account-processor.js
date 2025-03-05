const DatabaseController = require("../controllers/database-controller");
const bcrypt = require('bcryptjs');

const DatabaseModel = require('../models/database-model');

const databaseController = new DatabaseController();

class AccountProcessor {
    login(username, password) {
        // Login logic
    }
    async register(username, password, email) {

        const model = DatabaseModel.get({
            tableName: 'users',
            data: {
                type: 'username',
                value: username
            },
            returnType: ['id']
        })

        const userExists = await databaseController.data.get(model);
        if (userExists.length > 0) {
            return new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const addModel = DatabaseModel.add({
            tableName: 'users',
            data: {
                username: username,
                password: hashedPassword,
                email: email
            }
        });

        try {

            const newUserId = await databaseController.data.add(addModel);
            if (newUserId) {
                console.log('User registered');
                return newUserId;
            }
        } catch (err) {
            if (err.code === 'ER_NO_SUCH_TABLE') {
                databaseController.tables.create('users', [
                    'id INT AUTO_INCREMENT PRIMARY KEY',
                    'username VARCHAR(255) NOT NULL',
                    'password VARCHAR(255) NOT NULL',
                    'email VARCHAR(255) NOT NULL',
                    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                ]);
                const newUserId = databaseController.data.add('users', newUser);
                if (newUserId) {
                    console.log('User registered');
                    return newUserId;
                }
            }
        }
    }
    logout() {
        // Logout logic
    }
    resetPassword(email) {
        // Reset password logic
    }
    deleteAccount() {
        // Delete account logic
    }
}

module.exports = AccountProcessor