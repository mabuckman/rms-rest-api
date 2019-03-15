const express = require('express')
const getDB = require('./database/db')
const app = express()
const port = 3000

app.use(async function (req, res, next) {
    try {
        req.db = await getDB()
    }
    catch (err) {
        next(err)
    }
    next()
})

app.get('/', (req, res) => res.json({'test': 'Hello, World'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))