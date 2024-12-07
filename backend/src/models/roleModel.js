const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  name: { type: String, require: true, enum: ["admin", "user"], default: "user" },
  permission: { type: String, require: false }
})

const Role = mongoose.model("Role", roleSchema)

module.exports = Role