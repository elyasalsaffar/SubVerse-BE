const { Post, User, Subverse } = require('../models')

// Create a new post
const CreatePost = async (req, res) => {
    try {
        const { title, content, subverseId, imageUrls, videoUrl } = req.body
        const createdBy = res.locals.payload.id

        // Cannot allow user to upload both image and video
        if (imageUrls?.length > 0 && videoUrl) {
            return res.status(400).send({ msg: 'Post cannot have both images and video' })
        }

        const type = videoUrl ? 'video' : imageUrls?.length > 0 ? 'image' : 'text'

        const post = await Post.create({
            title,
            content,
            subverseId,
            createdBy,
            imageUrls: imageUrls || [],
            videoUrl: videoUrl || '',
            type
        })

        res.status(201).send(post)
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Failed to create post' })
    }
}

// Get all posts + includes filtering
const GetAllPosts = async (req, res) => {
    try {
        const { subverseId, sort } = req.query

        let filter = {}
        if (subverseId) filter.subverseId = subverseId

        const posts = await Post.find(filter).populate('createdBy', 'username')
                                             .populate('subverseId', 'name')
                                             .sort(sort === 'top' ? { votesCount: -1 } : { createdAt: -1 })
        
        res.status(200).send(posts)                                     
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch posts' })
    }
}

// Get a single post
const GetPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('createdBy', 'username')
                                                       .populate('subverseId', 'name')

        if (!post) return res.status(404).send({ msg: 'post not found' })
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch post' })
    }
}

// Delete post
const DeletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).send({ msg: 'Post not found' })

        const userId = res.locals.payload.id
        const isAdmin = res.locals.payload.isAdmin

        if (post.createdBy.toString() !== userId && !isAdmin) {
            return res.status(403).send({ msg: 'Not authorized to delete this post' })
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).send({ msg: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).send({ msg: 'Failed to delete post' })
    }
}

module.exports = {
    CreatePost,
    GetAllPosts,
    GetPostById,
    DeletePost
}