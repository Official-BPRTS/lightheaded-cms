const express = require('express');
const ViewController = require('../controllers/view-controller');
const auth = require('../middleware/auth');
const User = require('../middleware/user');

const viewController = new ViewController();
const user = new User();

const router = express.Router();

router.get('/', auth, viewController.getAdmin.bind(viewController));
router.get('/admin', auth, viewController.getAdmin.bind(viewController));
router.get('/login', user.checkUsers.bind(user), viewController.getLogin.bind(viewController));
router.get('/setup', viewController.getSetup.bind(viewController));

module.exports = router;