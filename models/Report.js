const { Schema } = require('mongoose')

const reportSchema = new Schema(
    {
        reportedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        reportingUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        reason: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = reportSchema