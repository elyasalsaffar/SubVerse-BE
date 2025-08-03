const router = require('express').Router()
const controller = require('../controllers/PostController')
const middleware = require('../middleware')

router.post(
    '/',
    middleware.stripToken,
    middleware.verifyToken,
    controller.CreatePost
)

router.get('/', controller.GetAllPosts)
router.get('/:id', controller.GetPostById)

router.delete(
    '/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeletePost
)

module.exports = router