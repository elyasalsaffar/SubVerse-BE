const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

router.post(
    '/',
    middleware.stripToken,
    middleware.verifyToken,
    controller.CreateComment
)

router.get('/:postId', controller.GetCommentsForPost)

router.delete(
    '/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeleteComment
)

module.exports = router