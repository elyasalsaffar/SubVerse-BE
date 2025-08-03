const { Comment } = require('../models')

// Create a new comment
const CreateComment = async (req, res) => {
    try {
        const { content, postId } = req.body
        const createdBy = res.locals.payload.id

        const comment = await Comment.create({ content, postId, createdBy })
        res.status(201).send(comment)
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Failed to create comment' })
    }
}

// Get all comments for a post
const GetCommentsForPost = async (req, res) => {
    try {
        const { postId } = req.params

        const comments = await Comment.find({ postId }).populate('createdBy', 'username')
                                                       .sort({ createdAt: -1 })
        
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to get comments' })
    }
}

// Delete a comment
const DeleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).send({ msg: 'Comment not found' })
        
        const userId = res.locals.payload.id
        const isAdmin = res.locals.payload.isAdmin

        if (comment.createdBy.toString() !== userId && isAdmin) {
            return res.status(403).send({ msg: 'Unauthorized to delete comment' })
        }

        await Comment.findByIdAndDelete(comment._id)
        res.status(200).send({ msg: 'Comment deleted' })
        } catch (error) {
        res.status(500).send({ msg: 'Failed to delete comment' })
    }
}

module.exports = {
    CreateComment,
    GetCommentsForPost,
    DeleteComment
}