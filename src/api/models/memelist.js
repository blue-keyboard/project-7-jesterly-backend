const mongoose = require('mongoose')

const memelistSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      description: { type: String },
      _memes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memes'
         }
      ],
      uploader: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'users',
         required: true
      }
   },
   {
      timestamps: true,
      collection: 'memelists'
   }
)

const Memelist = mongoose.model('memelists', memelistSchema, 'memelists')

module.exports = { Memelist }
