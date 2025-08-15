const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const SubverseRouter = require('./routes/SubverseRouter')
const PostRouter = require('./routes/PostRouter')
const VoteRouter = require('./routes/VoteRouter')
const CommentRouter = require('./routes/CommentRouter')
const ReportRouter = require('./routes/ReportRouter')
const AdminRouter = require('./routes/AdminRouter')

const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 3001

require('./db')
const voteSchema = require('./models/Vote')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://subverse.surge.sh'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
)

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

app.get('/health', (req, res) => res.send('ok'))

app.use('/', (req, res) => {
    res.send('Connected!')
})

app.listen(PORT, () => {
    console.log(`Running Express server on Port ${PORT} . . .`)
})