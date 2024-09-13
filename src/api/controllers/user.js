const { User } = require('../models/user')

const register = async (req, res, next) => {
   try {
      const user = new User(req.body)

      const usernameDuplicated = await User.findOne({
         username: req.body.username
      })
      const emailDuplicated = await User.findOne({ email: req.body.email })

      if (emailDuplicated) {
         return res.status(400).json('email already exists')
      }
      if (usernameDuplicated) {
         return res.status(400).json('username already exists')
      }

      const userSaved = await user.save()

      return res.status(201).json(userSaved)
   } catch (error) {
      return res.status(400).json('error\n', error)
   }
}

module.exports = { register }
