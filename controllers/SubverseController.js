const { Subverse } = require('../models')

// Create a new subverse
const CreateSubverse = async (req, res) => {
    try {
        const { name, description } = req.body
        const createdBy = res.locals.payload.id

        const existing = await Subverse.findOne({ name })
        if (existing) return res.status(400).send({ msg: 'Subverse already exists' })

        const subverse = await Subverse.create({ name, description, createdBy })
        res.status(201).send(subverse)
    } catch (error) {
        console.error(error)
        res.status(500).send({ msg: 'Failed to create subverse' })
    }
}

// Get all subverses
const GetAllSubverses = async (req, res) => {
    try {
        const subverse = await Subverse.find().populate('createdBy', 'username')
        res.status(200).send(subverse)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch subverses' })
    }
}

// Get subverse by ID
const GetSubverseById = async (req, res) => {
    try {
        const subverse = await Subverse.findById(req.params.id).populate('createdBy', 'username')
        if (!subverse) return res.status(400).send({ msg: 'Subverse not found' })
        res.status(200).send(subverse)
    } catch (error) {
        res.status(500).send({ msg: 'Failed to fetch subverse' })
    }
}

// Delete a subverse (admin or creator only)
const DeleteSubverse = async (req, res) => {
    try {
        const subverse = await Subverse.findById(req.params.id)
        if (!subverse) return res.status(400).send({ msg: 'Subverse not found' })

        const userId = res.locals.payload.id
        const isAdmin = res.locals.payload.isAdmin

        if (subverse.createdBy.toString() !== userId && !isAdmin) {
            return res.status(403).send({ msg: 'Unauthorized to delete this subverse' })
        }

        await Subverse.findByIdAndDelete(req.params.id)
        res.status(200).send({ msg: 'Subverse deleted successfully' })
    } catch (error) {
        res.status(500).send({ msg: 'Failed to delete subverse' })
    }
}

module.exports = {
    CreateSubverse,
    GetAllSubverses,
    GetSubverseById,
    DeleteSubverse
}