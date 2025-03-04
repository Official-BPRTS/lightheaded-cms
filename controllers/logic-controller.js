// Logic importing section
const AuthProcessor = require('../logic/auth-processor');
const DatabaseProcessor = require('../logic/database-processor');

// Logic controller class
class LogicController {
    constructor() {
        this.authProcessor = new AuthProcessor();
        this.databaseProcessor = new DatabaseProcessor();
    }
}

module.exports = new LogicController();