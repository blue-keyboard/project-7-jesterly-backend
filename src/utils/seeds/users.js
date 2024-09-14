require('dotenv').config()
const mongoose = require('mongoose')
const { User } = require('../../api/models/user')
const users = require('../../data/users')
const bcrypt = require('bcrypt')

const seedUsers = async () => {
   try {
      const usersHashed = users.map(
         (user) => (user.password = bcrypt.hashSync(user.password, 10))
      )
      await User.collection.drop()
      console.log('Users deleted')
      await User.insertMany(users)
      console.log('Users introduced')
   } catch (error) {
      console.log(error, 'error seedUsers')
   }
}

const seedScript = async () => {
   try {
      await mongoose.connect(process.env.DB_URL)
      await seedUsers()
      await mongoose.disconnect()
   } catch (error) {
      console.log('seed script error\n', error.message)
   }
}

seedScript()
