const mongoose = require('mongoose')
const userSchema = require('./User')
const postSchema = require('./Post')
const commentSchema = require('./Comment')
const reportSchema = require('./Report')
const subverseSchema = require('./Subverse')
const voteSchema = require('./Vote')

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)
const Report = mongoose.model('Report', reportSchema)
const Subverse = mongoose.model('Subverse', subverseSchema)
const Vote = mongoose.model('Vote', voteSchema)

module.exports = {
    User,
    Post,
    Comment,
    Report,
    Subverse,
    Vote
}