const Database = require('../logic/database');

class ViewController {
    getAdmin(req, res) {
        res.render('admin');
    }

    getLogin(req, res) {
        res.render('login');
    }
    
    async getSetup(req, res) {
        const db = new Database();
        try {
            await db.connect();
            const hasUsers = await db.checkUserTable();
            if (!hasUsers) {
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