const { Report, User } = require('../models')

// Report a user
const ReportUser = async (req, res) => {
    try {
        const reportingUserId = res.locals.payload.id
        const { reportedUserId, reason } = req.body

        if (reportingUserId === reportedUserId) {
            return res.status(400).send({ msg: "Your can't report yourself" })
        }

        const existing = await Report.findOne({ reportedUserId, reportingUserId })
        if (existing) {
            return res.status(400).send({ msg: 'You already reported this user' })
        }

        const report = await Report.create({ reportedUserId, reportingUserId, reason })
        const totalReports = await Report.countDocuments({ reportedUserId })

        if (totalReports >= 5) {
            await User.findByIdAndUpdate(reportedUserId, { reportCount: totalReports })
        }

        res.status(201).send({ msg: 'Report submitted', report })
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Failed to report user' })
    }
}

    // Get all users with 5+ reports
const GetFlaggedUsers = async (req, res) => {
    try {
        if (!res.locals.payload.isAdmin) {
            return res.status(403).send({ msg: 'Only admin can view flagged users' })
        }

        const flaggedUsers = await User.find({ reportCount: { $gte: 5 } }).select('username reportCount isSuspended')
        
        res.status(200).send(flaggedUsers)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch flagged users' })
    }
}


module.exports = {
    ReportUser,
    GetFlaggedUsers
}