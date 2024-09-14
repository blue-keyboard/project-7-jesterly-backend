const { Memelist } = require('../models/memelist')
const { Meme } = require('../models/meme')
const { User } = require('../models/user')

const populateQuery = [
   { path: 'uploader', select: ['_id', 'username'] },
   { path: 'memes', select: ['_id', 'title'] }
]

//Everyone
const getMemelists = async (req, res, next) => {
   try {
      const memelists = await Memelist.find().populate(populateQuery)

      return res.status(200).json(memelists)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

//Everyone
const getMemelist = async (req, res, next) => {
   try {
      const memelist = await Memelist.findById(req.params.id).populate(
         populateQuery
      )

      return res.status(200).json(memelist)
   } catch (error) {
      return res.status(404).json(error.message)
   }
}

// User
const postMemelist = async (req, res, next) => {
   try {
      const { _id, memelists } = req.user

      const newMemelist = new Memelist(req.body)
      newMemelist.uploader = _id

      const savedMemelist = await newMemelist.save()
      await User.findByIdAndUpdate(_id, {
         memelists: [...new Set([...memelists, newMemelist])]
      })

      return res.status(201).json(savedMemelist)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// same User
const updateMemelist = async (req, res, next) => {
   try {
      const listId = req.params.id
      const { _id } = req.user
      const { uploader } = await Memelist.findById(listId).populate(
         populateQuery
      )
      if (!uploader.equals(_id)) {
         return res
            .status(400)
            .json('The memelist you are trying to update is from another user')
      }

      const newMemelist = await Memelist.findByIdAndUpdate(listId, req.body, {
         new: true,
         runValidators: true
      })

      return res.status(200).json(newMemelist)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// Admin or same user that uploaded the memelist
const deleteMemelist = async (req, res, next) => {
   try {
      const { _id, role } = req.user
      const memelistId = req.params.id
      const memelist = await Memelist.findById(memelistId).populate(
         populateQuery
      )

      if (!memelist.uploader.equals(_id) && role === 'user') {
         return res
            .status(400)
            .json("You don't have permissions to perform this action")
      }

      const deletedMemelist = await Memelist.findByIdAndDelete(memelistId)

      return res.status(200).json(deletedMemelist)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

module.exports = {
   getMemelist,
   getMemelists,
   postMemelist,
   updateMemelist,
   deleteMemelist
}
