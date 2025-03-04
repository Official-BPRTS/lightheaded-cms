const logicController = require('../controllers/logic-controller');

class User {
    constructor() {
        this.databaseProcessor = logicController.databaseProcessor;
    }
    
    async checkUsers(req, res, next) {
        try {
            const users = await this.databaseProcessor.data.get('users');
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