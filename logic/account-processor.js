const logicController = require("../controllers/logic-controller");

class AccountProcessor {
    login(username, password) {
        // Login logic
    }
    register(username, password, email) {
        console.log('Registering logic triggerd');

        const userExists = logicController.databaseProcessor.data.get('users', 'username', username);
        if (userExists) {
            return new Error('User already exists');
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
            email
        };

        try {
            const newUserId = logicController.databaseProcessor.data.add('users', newUser);
            if (newUserId) {
                console.log('User registered');
                return newUserId;
            }
        } catch (err) {
            if (err.code === 'ER_NO_SUCH_TABLE') {
                logicController.databaseProcessor.tables.create('users', [
                    'id INT AUTO_INCREMENT PRIMARY KEY',
                    'username VARCHAR(255) NOT NULL',
                    'password VARCHAR(255) NOT NULL',
                    'email VARCHAR(255) NOT NULL',
                    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                ]);
                const newUserId = logicController.databaseProcessor.data.add('users', newUser);
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