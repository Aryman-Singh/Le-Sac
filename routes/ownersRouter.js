const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owner-model")
const isloggedin = require("../middlewares/isLoggedin")
const isOwnerLoggedin = require("../middlewares/isOwnerLoggedin")
const {loginAdmin} = require("../controllers/authControllerAdmin")

if(process.env.NODE_ENV === "development"){
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find()
    if(owner.length > 0){
      return res.status(400).send("Owner already exists")
    }
    let createdOwner = await ownerModel.create({
      fullname: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.status(201).send(createdOwner)
  })
} 

router.get("/admin", isOwnerLoggedin, (req, res) => {
  res.render("createproducts")
})

router.post("/adminLogin", loginAdmin)

module.exports = router