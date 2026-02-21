const mongoose = require("mongoose")
const config = require("config")
const dbgr= require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/le-sac`)
.then(function(result){
  dbgr("Connected to MongoDB");
})
.catch(function(err){
  dbgr("Error connecting to MongoDB:", err);a
})

module.exports = mongoose.connection