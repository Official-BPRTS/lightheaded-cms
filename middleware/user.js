const DatabaseController = require('../controllers/database-controller');
const DataBaseModel = require('../models/database-model');

class User {
    constructor() {
        this.databaseController = new DatabaseController();
    }
    
    async checkUsers(req, res, next) {
        const model = DataBaseModel.get({
            tableName: 'users',
        });

        try {
            const users = await this.databaseController.data.get(model);
            const userCount = users.length;
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