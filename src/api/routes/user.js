const { isAdmin, isAuth } = require('../../middlewares/auth')
const {
   getUsers,
   getUser,
   register,
   login,
   updateUser,
   deleteUser
} = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.get('/:id', getUser)
usersRouter.get('/', [isAdmin], getUsers)
usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAdmin], updateUser)
usersRouter.delete('/:id', [isAuth], deleteUser)

module.exports = { usersRouter }
