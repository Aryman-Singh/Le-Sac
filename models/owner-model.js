const mongoose = require("mongoose")

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    required: true
  },
  email: String,
  password: String,
  isadmin:Boolean,
  products:{
    type:Array,
    default:[]
  },
  contact:Number,
  picture:String
})

module.exports = mongoose.model("owner", ownerSchema)