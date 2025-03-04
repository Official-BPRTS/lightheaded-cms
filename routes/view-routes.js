const express = require('express');
const ViewController = require('../controllers/view-controller');
const auth = require('../middleware/auth');
const User = require('../middleware/user');
const logicController = require('../controllers/logic-controller');

const viewController = new ViewController();
const user = new User();

const router = express.Router();

router.get('/', auth, viewController.getAdmin.bind(viewController));
router.get('/admin', auth, viewController.getAdmin.bind(viewController));
router.get('/login', user.checkUsers.bind(user), viewController.getLogin.bind(viewController));
router.get('/setup', viewController.getSetup.bind(viewController));

router.get('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields are required');
    }
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }
    logicController.authProcessor.register(username, password, email);
});

module.exports = router;