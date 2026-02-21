const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body

    if (!email || !password || !fullname) {
      return res.status(400).redirect("/")
    }

    let userExists = await userModel.findOne({ email })
    if (userExists) return res.status(409).redirect("/")

    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)

    let user = await userModel.create({
      email,
      password: hash,
      fullname,
    })

    let token = generateToken(user)
    res.cookie("token", token)
    res.redirect("/shop")
  } catch (err) {
    res.send(err.message)
  }
}

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).redirect("/")
    }

    let user = await userModel.findOne({ email })
    if (!user) return res.status(401).redirect("/")
    let result = await bcrypt.compare(password, user.password)

    if (!result) return res.status(401).redirect("/")

    let token = generateToken(user)
    res.cookie("token", token)
    res.redirect("/shop")
  } catch (err) {
    res.send(err.message)
  }
}

module.exports.logout = function (req, res) {
  res.clearCookie("token")
  res.redirect("/")
}
