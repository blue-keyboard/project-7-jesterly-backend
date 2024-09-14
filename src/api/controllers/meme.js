const { Meme } = require('../models/meme')
const { User } = require('../models/user')

const populateQuery = { path: 'uploader', select: ['_id', 'username'] }

//Everyone
const getMemes = async (req, res, next) => {
   try {
      const memes = await Meme.find().populate(populateQuery)

      return res.status(200).json(memes)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

//Everyone
const getMeme = async (req, res, next) => {
   try {
      const meme = await Meme.findById(req.params.id).populate(populateQuery)

      return res.status(200).json(meme)
   } catch (error) {
      return res.status(404).json(error.message)
   }
}

// User
const postMeme = async (req, res, next) => {
   try {
      const { _id, memes } = req.user

      const newMeme = new Meme(req.body)
      newMeme.uploader = _id

      const savedMeme = await newMeme.save()
      await User.findByIdAndUpdate(_id, {
         memes: [...new Set([...memes, newMeme])]
      })

      return res.status(201).json(savedMeme)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// Admin or same user that uploaded the meme
const deleteMeme = async (req, res, next) => {
   try {
      const { _id, role } = req.user
      const memeId = req.params.id
      const meme = await Meme.findById(memeId).populate(populateQuery)

      if (!meme.uploader.equals(_id) && role === 'user') {
         return res
            .status(400)
            .json("You don't have permissions to perform this action")
      }

      const deletedMeme = await Meme.findByIdAndDelete(memeId)

      return res.status(200).json(deletedMeme)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

const getMemesByTag = async (req, res, next) => {
   try {
      const { tag } = req.params
      const memes = await Meme.find({ tags: tag }).populate(populateQuery)

      return res.status(200).json(memes)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

module.exports = { getMemes, getMeme, postMeme, deleteMeme, getMemesByTag }
