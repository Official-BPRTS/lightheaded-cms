const logicController = require('./logic-controller');

class ViewController {
    getAdmin(req, res) {
        return res.render('admin', { title: 'Admin Page' });
    }

    getLogin(req, res) {
        res.render('login', { title: 'Login Page' });
    }
    
    async getSetup(req, res) {
        try {
            const hasUsers = await logicController.databaseProcessor.data.get('users');
            if (hasUsers.length === 0) {
                return res.render('setup', { title: 'Setup Page', step: 3 });
            }
            return res.render('setup', { title: 'Setup Page', step: 2 });
        } catch (err) {
            console.error('Error checking for users:', err);
            return res.render('setup', { title: 'Setup Page', step: 1 });
        }
    }
}

module.exports = ViewController;