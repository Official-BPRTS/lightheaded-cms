const Database = require('../logic/database');

class User {
    constructor() {
        this.db = new Database();
        this.db.connect();
    }
    
    async checkUsers(req, res, next) {
        try {
            const [rows] = await this.db.connection.promise().query('SELECT COUNT(*) AS count FROM users');
            const userCount = rows[0].count;
            if (userCount === 0) {
                return res.redirect('/setup');
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = User;
