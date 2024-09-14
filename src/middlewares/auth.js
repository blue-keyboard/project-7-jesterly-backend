const { User } = require('../api/models/user')
const { verifyJwt } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
   try {
      const token = req.headers.authorization
      const parsedToken = token.replace('Bearer ', '')
      console.log(parsedToken)

      const { id } = verifyJwt(parsedToken)
      const user = await User.findById(id)
      user.password = null
      req.user = user

      console.log(user)

      next()
   } catch (error) {
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
