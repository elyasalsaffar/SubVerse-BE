const router = require('express').Router()
const controller = require('../controllers/AdminController')
const middleware = require('../middleware')

router.patch(
    '/suspend/:userId',
    middleware.stripToken,
    middleware.verifyToken,
    controller.ToggleUserSuspension
)

router.delete(
    '/delete-post/:postId',
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeleteAnyPost
)

router.get(
    '/reports',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllReports
)

module.exports = router