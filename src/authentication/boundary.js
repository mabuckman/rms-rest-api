const express = require('express')
const jwt = require('jsonwebtoken');
const authenticationInteractor = require('./interactor')

router = express.Router()

router.use(async function (req, res, next) {
    req.authenticationInteractor = new authenticationInteractor({db: req.db})
    next()
})

router.route('/')
        .get(async (req, res, next) => {
            try {
                result = await req.authenticationInteractor.getToken(
                    req.headers.email, 
                    req.headers.password
                )
                res.json({"authorization": result})
            }
            catch (err) {
                next(err)
            }
        })

module.exports = router