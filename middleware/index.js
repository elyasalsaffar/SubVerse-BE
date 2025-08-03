const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.eventNames.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
}

const comparePassword = async (password, storedPassword) => {
    let passwordMatch = await bcrypt.compare(password, storedPassword)
    return passwordMatch
}

createToken = (payload) => {
    let token = jwt.sign(payload, APP_SECRET)
    return token
}

const stripToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            console.log('Authorization header missing!')
            return res.status(401).send({ status: 'Error', msg: 'Authorization header missing!' })
        }

        const tokenParts = authHeader.split(' ')

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            console.log('Invalid Authorization header format!')
            return res.status(401).send({ status: 'Error', msg: 'Invalid Authorization header format. Expected "Bearer [token]"' })
        }

        const token = tokenParts[1]

        if (!token) {
            console.log('Token missing after Bearer prefix!')
            return res.status(401).send({ status: 'Error', msg: 'Token missing!' })
        }

        res.locals.token = token
        return next()

        } catch (error) {
            console.error('Strip Token Error:', error);
            res.status(401).send({ status: 'Error', msg: 'An unexpected error occurred while processing the token.' });
        }
}

const verifyToken = (req, res, next) => {
    const { token } = res.locals
    try {
        let payload = jwt.verify(token, APP_SECRET)
        if (payload) {
            res.locals.payload = payload
            return next()
        }
        res.status(401).send({ staus: 'Error', msg: 'Unauthorized' })
    } catch (error) {
        console.log(error)
        res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    stripToken,
    verifyToken
}