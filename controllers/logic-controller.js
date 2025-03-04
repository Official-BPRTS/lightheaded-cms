const AccountProcessor = require('../logic/account-processor');
const DatabaseProcessor = require('../logic/database-processor');

class LogicController {
    constructor() {
        this.accountProcessor = new AccountProcessor();
        this.databaseProcessor = new DatabaseProcessor();
    }
}

module.exports = new LogicController();