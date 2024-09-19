const { User } = require('../api/models/user')
const { verifyJwt } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
   try {
      const token = req.headers.authorization
      const parsedToken = token.replace('Bearer ', '')

      const { id } = verifyJwt(parsedToken)

      try {
         const user = await User.findById(id)
         user.password = null
         req.user = user
      } catch (error) {
         return res.status(404).json('User not found')
      }

      next()
   } catch (error) {
      console.log(error.message)
      return res.status(400).json('Unauthorized')
   }
}

const isAdmin = async (req, res, next) => {
   try {
      const token = req.headers.authorization
      const parsedToken = token.replace('Bearer ', '')
      const { id } = verifyJwt(parsedToken)
      const user = await User.findById(id)

      if (user.role === 'admin') {
         user.password = null
         req.user = user
      } else {
         return res
            .status(400)
            .json('You need admin permissions to perform this action')
      }
      next()
   } catch (error) {
      return res.status(400).json('Unauthorized')
   }
}

module.exports = { isAuth, isAdmin }
