const router = require('express').Router()
const controller = require('../controllers/VoteController')
const middleware = require('../middleware')

router.post(
    '/:postId',
    middleware.stripToken,
    middleware.verifyToken,
    controller.VoteOnPost
)

router.get('/:postId', controller.GetVotesForPost)

module.exports = router