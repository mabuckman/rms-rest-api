const jwt = require('jsonwebtoken');

class AuthenticationInteractor {
    constructor(options) {
        this.db = options.db
    }

    async getToken(email, password) {
        const res = await this.db.get('SELECT * FROM USERS WHERE user_email = ? and user_password = ?', email, password)
        if (res) {
            const token = jwt.sign({
                user_id: res.user_id,
                user_common_name: res.user_common_name,
                user_email: res.user_email,
            }, 'secret')
            
            return token
        }
        throw new Error("Error Invalid Credentials")
    }
}

module.exports = AuthenticationInteractor