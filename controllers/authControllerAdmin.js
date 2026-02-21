const ownerModel = require("../models/owner-model")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

module.exports.loginAdmin = async function (req, res) {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      req.flash("error", "Provide both email and password")
      return res.redirect("/adminlogin")
    }

    let admin = await ownerModel.findOne({ email })
    if (!admin) {
      req.flash("error", "Admin not found")
      return res.redirect("/adminlogin")
    }
    let result = await bcrypt.compare(password, admin.password)

    if (!result) {
      req.flash("error", "Invalid credentials")
      return res.redirect("/adminlogin")
    }

    let token = generateToken(admin)
    res.cookie("token", token)
    res.redirect("/owners/admin")
  } catch (err) {
    req.flash("error", "Something went wrong")
    res.redirect("/adminlogin")
  }
}