const sqlite = require('sqlite');
const Promise = require('bluebird')
const path = require('path')

db = null

async function getDB() {
    if (db != null) {
        return db
    }
    else {
        try {
            const file_path = path.join(__dirname, 'db.sqlite')
            db = await sqlite.open(file_path, { Promise })
            return db
        }
        catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = getDB