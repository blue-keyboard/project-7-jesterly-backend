require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const { usersRouter } = require('./src/api/routes/user')
const { memesRouter } = require('./src/api/routes/meme')

const app = express()
app.use(express.json())

connectDB()

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/memes', memesRouter)

app.use('*', (req, res, next) => {
   return res.status(404).json('Route not found')
})

app.listen(3000, () => {
   console.log('http://localhost:3000 🤗')
})
