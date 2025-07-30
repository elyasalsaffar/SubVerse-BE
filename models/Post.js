const { Schema } = require('mongoose')

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String },
        imageUrls: [String],
        videoUrl: { type: String },
        type: { type: String, enum: ['text', 'image', 'video'], required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subverseId: { type: Schema.Types.ObjectId, ref: 'Subverse', required: true }
    },
    { timestamps: true }
)

module.exports = postSchema