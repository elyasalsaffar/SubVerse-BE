const { Schema } = require('mongoose')

const commentSchema = new Schema(
    {
        content: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
)

module.exports = commentSchema