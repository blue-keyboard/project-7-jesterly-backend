const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      img: { type: String, required: true },
      tags: [{ type: String }],
      uploader: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'users',
         required: true
      }
   },
   {
      timestamps: true,
      collection: 'memes'
   }
)

const Meme = mongoose.model('memes', memeSchema, 'memes')

module.exports = { Meme }
