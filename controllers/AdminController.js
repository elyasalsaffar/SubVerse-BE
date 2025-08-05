const { User, Post, Report } = require('../models')

// Suspend or unsuspend a user
const ToggleUserSuspension = async (req, res) => {
    try {
        const isAdmin = res.locals.payload.isAdmin
        if (!isAdmin) return res.status(403).send({ msg: 'Forbidden' })
        
        const { userId } = req.params

        const user = await User.findById(userId)
        if (!user) return res.status(404).send({ msg: 'User not found' })

        user.isSuspended = !user.isSuspended
        await user.save()

        res.status(200).send({ msg: user.isSuspended ? 'User suspended' : 'User unsuspended', user: { username: user.username, isSuspended: user.isSuspended } })
    } catch (error) {
        res.status(500).send({ msg: 'Failed to toggle suspension' })
    }
}

// Delete a post
const DeleteAnyPost = async (req, res) => {
    try {
        const isAdmin = res.locals.payload.isAdmin
        if (!isAdmin) return res.status(403).send({ msg: 'Forbidden' })

        const { postId } = req.params

        const post = await Post.findById(postId)
        if (!post) return res.status(404).send({ msg: 'Post not found`' })

        await Post.findByIdAndDelete(postId)
        res.status(200).send({ msg: 'Post deleted by admin' })
    } catch (error) {
        res.status(500).send({ msg: 'Failed to delete post' })
    }
}

// View all reports
const GetAllReports = async (req, res) => {
    try {
        const isAdmin = res.locals.payload.isAdmin
        if (!isAdmin) return res.status(403).send({ msg: 'Forbidden' })

        const reports = await Report.find().populate('reportingUserId', 'username')
                                           .populate('reportedUserId', 'username')
                                           .sort({ createdAt: -1 })
        
        res.status(200).send(reports)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch reports' })
    }
}

module.exports = {
    ToggleUserSuspension,
    DeleteAnyPost,
    GetAllReports
}