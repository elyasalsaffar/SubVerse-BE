const router = require('express').Router()
const controller = require('../controllers/ReportController')
const middleware = require('../middleware')

router.post(
    '/',
    middleware.stripToken,
    middleware.verifyToken,
    controller.ReportUser
)

router.get(
    '/flagged',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetFlaggedUsers
)

module.exports = router