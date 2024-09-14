const { generateSign } = require('../../utils/jwt')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')

// Admin role
const getUsers = async (req, res, next) => {
   try {
      const users = await User.find()

      return res.status(200).json(users)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

//Everyone
const getUser = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id)

      return res.status(200).json(user)
   } catch (error) {
      return res.status(404).json(error.message)
   }
}

// Everyone
const register = async (req, res, next) => {
   try {
      const user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         role: 'user'
      })

      const usernameDuplicated = await User.findOne({
         username: user.username
      })
      const emailDuplicated = await User.findOne({ email: user.email })
      if (emailDuplicated) {
         return res.status(400).json('email already exists')
      }
      if (usernameDuplicated) {
         return res.status(400).json('username already exists')
      }

      const userSaved = await user.save()

      return res.status(201).json(userSaved)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// Everyone
const login = async (req, res, next) => {
   try {
      const user = await User.findOne({ username: req.body.username })

      if (!user) {
         return res.status(404).json('Username not found')
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
         const token = generateSign(user._id)
         return res.status(200).json({ user, token })
      } else {
         return res.status(400).json('Incorrect password')
      }
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// admin role
const updateUser = async (req, res, next) => {
   try {
      const userUpdated = await User.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true
         }
      )

      return res.status(200).json(userUpdated)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// admin role
const deleteUser = async (req, res, next) => {
   try {
      const userDeleted = await User.findByIdAndDelete(req.params.id)

      return res.status(200).json(userDeleted)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

module.exports = { getUsers, getUser, register, login, updateUser, deleteUser }
