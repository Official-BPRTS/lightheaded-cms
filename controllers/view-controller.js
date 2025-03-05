const logicController = require('./logic-controller');
const DataBaseModel = require('../models/database-model');

class ViewController {
    getAdmin(req, res) {
        return res.render('admin', { title: 'Admin Page' });
    }

    getLogin(req, res) {
        res.render('login', { title: 'Login Page' });
    }
    
    async getSetup(req, res) {
        const model = DataBaseModel.get;
        model.tableName = 'users';

        try {
            const hasUsers = await logicController.databaseProcessor.data.get(model);
            if (hasUsers.length > 0) {
                return res.redirect('/login');
            } else if (hasUsers.length === 0) {
                return res.render('setup', { title: 'Setup Page', step: 3 });
            } else {
                return res.render('setup', { title: 'Setup Page', step: 2 });
            }
        } catch (err) {
            console.error('Error in getSetup function while checking for users in the database:', err);
            return res.render('setup', { title: 'Setup Page', step: 1 });
        }
    }
}

module.exports = ViewController;