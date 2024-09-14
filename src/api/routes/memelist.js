const { isAuth } = require('../../middlewares/auth')
const {
   getMemelist,
   getMemelists,
   postMemelist,
   updateMemelist,
   deleteMemelist
} = require('../controllers/memelist')

const memelistsRouter = require('express').Router()

memelistsRouter.get('/:id', getMemelist)
memelistsRouter.put('/:id', [isAuth], updateMemelist)
memelistsRouter.delete('/:id', [isAuth], deleteMemelist)
memelistsRouter.get('/', getMemelists)
memelistsRouter.post('/', [isAuth], postMemelist)

module.exports = { memelistsRouter }
