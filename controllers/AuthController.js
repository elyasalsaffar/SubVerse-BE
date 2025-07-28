const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send('A user with that email has already been registered!')
    } else {
      const user = await User.create({ first, last, email, passwordDigest, phone })
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isSuspended: user.isSuspended,
        reportCount: user.reportCount
      }
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.user_id)
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.status(200).send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { username, email } = req.body
    let updatedFields = { username, email }

    if (password) {
      const passwordDigest = await middleware.hashPassword(password)
      updatedFields.passwordDigest = passwordDigest
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.user_id,
      updatedFields,
      { new: true }
    )

    const payload = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    }

    const token = middleware.createToken(payload)

    res.status(200).send({ status: 'Profile updated successfully!', user: payload, token })
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: 'Failed to update profile' })
  }
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-passwordDigest')
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ msg: 'Failed to fetch users' })
  }
}

const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.user_id)
    res.status(200).send({ msg: 'User deleted' })
  } catch (error) {
    res.status(500).send({ msg: 'failed to delete user' })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  UpdateUser,
  GetAllUsers,
  DeleteUser,
  CheckSession
}