const jwt = require("jsonwebtoken")
const ownerModel = require("../models/owner-model")

module.exports = async function (req, res, next) {
  try {
    let token = req.cookies.token
    if (!token) {
      req.flash("error", "You are not logged in")
      return res.redirect("/adminlogin")
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    let owner = await ownerModel.findOne({ email: decoded.email })
    if (!owner) return res.status(401).send("Owner does not exist")
    req.user = owner
    next()
  } catch (err) {
    req.flash("error", "Authentication error")
    res.redirect("/adminlogin")
  }
}
