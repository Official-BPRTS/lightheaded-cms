const AccountProcessor = require("../logic/account-processor");
const accountProcessor = new AccountProcessor();


class AccountController {
    register(username, password, email) {
        const response = accountProcessor.register(username, password, email);
        return response;
    }
    login(username, password) {
        const response = accountProcessor.login(username, password);
        return response;
    }
    logout() {
        const response = accountProcessor.logout();
        return response;
    }
    resetPassword(email) {
        const response = accountProcessor.resetPassword(email);
        return response;
    }
    deleteAccount() {
        const response = accountProcessor.deleteAccount();
        return response;
    }
}

module.exports = AccountController;