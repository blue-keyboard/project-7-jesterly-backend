const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
   {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      role: {
         type: String,
         required: true,
         enum: ['user', 'admin'],
         default: 'user'
      },
      _memes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memes'
         }
      ],
      _memelists: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memelists'
         }
      ]
   },
   {
      timestamps: true,
      collection: 'users'
   }
)

userSchema.pre('save', function () {
   this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = { User }
