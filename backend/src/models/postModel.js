const mongoose = require('mongoose')
const couple = require('./coupleModel')
const user = require('./userModel')

const postSchema = new mongoose.Schema({
  coupleId: { type: mongoose.Schema.Types.ObjectId, ref: couple, required: true },
  status: { type: String },
  userPostId: { type: mongoose.Schema.Types.ObjectId, ref: user, required: true },
  image: {type: String, required: true}
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

module.exports = Post