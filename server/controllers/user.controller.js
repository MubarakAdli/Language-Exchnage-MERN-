
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");
const auth = (user) => jwt.sign({ _id: user._id}, secret)



class UserController {
  async register(req, res) {

    const users = await User.find({})
    const { firstName, lastName, email, nativeLang, password, confirm } =
      req.body;


    console.log(users)

      // console.log("ay eshi")
      User.create({ firstName, lastName, email, nativeLang, password, confirmPass: confirm, admin: users.length === 0 })

        .then((user) => {
          res
            .cookie("usertoken", auth(user), {
              httpOnly: true,
            })
            .json({ msg: "success!", user: user });
        })
        .catch((err) => res.status(400).json(err));

  };

  login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user === null) {
          res.json({ msg: "invalid login attempt-user not found" })
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
              if (passwordIsValid) {
                res.cookie("usertoken", auth(user), { httpOnly: true })
                  .json({ msg: "success!" });
              } else {
                res.json({ msg: "invalid login attempt- password incorrect" })
              }
            })
            .catch(err => res.json({ msg: "invalid login attempt", err }))
        }
      })
      .catch(err => res.json(err))
  }

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJWT.payload._id)
      .then(user => res.json({ user }))
      .catch(err => res.json(err))
  }

  logout(req, res) {
    res.cookie("usertoken", jwt.sign({ _id: "" }, secret), {
      httpOnly: true,
      maxAge: 0
    }).json({ msg: "ok" })
  }
    EditUser = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}


}
module.exports = new UserController()