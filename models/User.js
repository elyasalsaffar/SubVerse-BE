const { Schema } = require('mongoose')

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        passwordDigest: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        isSuspended: { type: Boolean, default: false },
        reportCount: { type: Number, default: 0 },
    },
    { timestamps: true }
)

module.exports = userSchema