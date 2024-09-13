const { register } = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.post('/register', register)

module.exports = { usersRouter }
