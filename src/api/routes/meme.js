const { isAuth } = require('../../middlewares/auth')
const {
   getMeme,
   getMemes,
   postMeme,
   deleteMeme,
   getMemesByTag
} = require('../controllers/meme')

const memesRouter = require('express').Router()

memesRouter.get('/tags/:tag', getMemesByTag)
memesRouter.get('/:id', getMeme)
memesRouter.delete('/:id', [isAuth], deleteMeme)
memesRouter.get('/', getMemes)
memesRouter.post('/', [isAuth], postMeme)

module.exports = { memesRouter }
