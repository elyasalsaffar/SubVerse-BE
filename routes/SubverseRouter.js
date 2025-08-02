const router = require('express').Router()
const controller = require('../controllers/SubverseController')
const middleware = require('../middleware')

router.post(
    '/',
    middleware.stripToken,
    middleware.verifyToken,
    controller.CreateSubverse
)

router.get('/', controller.GetAllSubverses)
router.get('/:id', controller.GetSubverseById)

router.delete(
    '/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeleteSubverse
)

module.exports = router