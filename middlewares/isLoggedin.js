const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports = async function(req, res, next) {
  try{
    let token = req.cookies.token;
    if(!token){
        req.flash("error", "You are not logged in");
        return res.redirect("/");
    } 
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel.findOne({email: decoded.email});
    if(!user) return res.status(401).send("User does not exist");
    req.user = user;
    next();
  }
  catch(err){
    req.flash("error", "something broke in");
    res.redirect("/");
  }
}