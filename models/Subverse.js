const { Schema } = require('mongoose')

const subverseSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
)

module.exports = subverseSchema