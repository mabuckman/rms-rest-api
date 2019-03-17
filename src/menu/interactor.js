const jwt = require('jsonwebtoken');

class MenuInteractor {
    constructor(options) {
        this.db = options.db
    }

    async getMenu(email, password) {
        
    }
}

module.exports = AuthenticationInteractor