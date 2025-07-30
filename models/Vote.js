const { Schema } = require('mongoose')

const voteSchema = new Schema(
    {
        type: { type: String, enum: ['upvote', 'downvote'], required: true },
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
)

// Create a unique index for each user's vote on a specific post to ensure a single vote for each user
voteSchema.index({ postId: 1, userId: 1 }, { unique: true })

module.exports = voteSchema