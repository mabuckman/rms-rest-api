'strict mode'
const express = require('express')
const getDB = require('./database/db')
const authentication = require('./authentication/boundary')
const menu = require('./menu/boundary')
const app = express()
const port = 3000

app.use(async function (req, res, next) {
    try {
        req.db = await getDB()
        next()
    }
    catch (err) {
        next(err)
    }
})

app.use('/login', authentication)

// Verify token is valid
app.use(async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'your-256-bit-secret')
        
        req.user_id = decoded.user_id,
        req.user_common_name = decoded.user_common_name
        req.user_email = decoded.user_email
        
        next()
    }
    catch (err) {
       next("Error: Invalid Credentials")
    }
})

app.use('/menu', menu)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))