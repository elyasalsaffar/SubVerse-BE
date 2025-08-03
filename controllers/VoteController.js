const { Vote, Post } = require('../models')

// Update vote
const VoteOnPost = async (req, res) => {
    try {
        const { postId } = req.params
        const { type } = req.body
        const userId = res.locals.payload.id

        const existing = await Vote.findOne({ postId, userId })

        if (existing) {
            if (existing.type === type) {
                await Vote.findByIdAndDelete(existing._id)
                return res.status(200).send({ msg: 'Vote removed' })
            } else {
                existing.type = type
                await existing.save()
                return res.status(200).send({ msg: 'Vote updated', vote: existing })
            }
        } else {
            const vote = await Vote.create({ postId, userId, type })
            return res.status(201).send({ msg: 'Vote added', vote })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Vote failed' })
    }
}

// Votes count per post
const GetVotesForPost = async (req, res) => {
    try {
        const { postId } = req.params

        const upvotes = await Vote.countDocuments({ postId, type: 'upvote' })
        const downvotes = await Vote.countDocuments({ postId, type: 'downvote' })

        res.status(200).send({ upvotes, downvotes, score: upvotes - downvotes })
    } catch (error) {
        res.status(500).send({ msg: 'Failed to count votes' })
    }
}

module.exports = {
    VoteOnPost,
    GetVotesForPost
}