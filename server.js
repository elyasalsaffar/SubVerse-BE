const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const SubverseRouter = require('./routes/SubverseRouter')
const PostRouter = require('./routes/PostRouter')
const VoteRouter = require('./routes/VoteRouter')
const CommentRouter = require('./routes/CommentRouter')
const ReportRouter = require('./routes/ReportRouter')
const AdminRouter = require('./routes/AdminRouter')

const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 3001

const db = require('./db')
const voteSchema = require('./models/Vote')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/subverses', SubverseRouter)
app.use('/posts', PostRouter)
app.use('/votes', VoteRouter)
app.use('/comments', CommentRouter)
app.use('/reports', ReportRouter)
app.use('/admin', AdminRouter)

app.use('/', (req, res) => {
    res.send('Connected!')
})

app.listen(PORT, () => {
    console.log(`Running Express server on Port ${PORT} . . .`)
})