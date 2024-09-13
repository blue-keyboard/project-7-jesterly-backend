const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      admin: { type: Boolean, required: true },
      memes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memes'
         }
      ],
      memelists: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memelists'
         }
      ]
   },
   {
      timestamps: true
   }
)

const User = mongoose.model('users', userSchema, 'users')

module.exports = { User }
