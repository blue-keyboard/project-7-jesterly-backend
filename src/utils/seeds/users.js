require('dotenv').config()
const mongoose = require('mongoose')
const { User } = require('../../api/models/user')
const users = require('../../data/users')
const bcrypt = require('bcrypt')

// CORRECCIÓN
// la idea era poner la variable usersHashed
// en --await User.insertMany(users)--
// pero al manipular objetos con el .map() estaba 'cambiando'
// la variable -users- de por si y por eso no me estaba dando cuenta del error
// aparte que tenia la funcion mal y me hubiera dado error si ponia 'usersHashed'

const seedUsers = async () => {
   try {
      // con structuredClone() evito modificar el array original
      const usersHashed = structuredClone(users).map((user) => {
         user.password = bcrypt.hashSync(user.password, 10)
         return user
      })

      await User.collection.drop()
      console.log('Users deleted')
      await User.insertMany(usersHashed)
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
