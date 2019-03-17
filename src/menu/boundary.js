const express = require('express')
const jwt = require('jsonwebtoken');
const menuInteractor = require('./interactor')

router = express.Router()

router.use(async function (req, res, next) {
    req.menuInteractor = new menuInteractor({db: req.db})
    next()
})

router.route('/')
        .get(async (req, res, next) => {
            try {
                const result = req.menuInteractor.getMenu()
                res.json(result)
            }
            catch (err) {
                next(err)
            }
        })

module.exports = router