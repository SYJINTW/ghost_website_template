const router = require("express").Router();
const jwt = require("jsonwebtoken");

const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;

router.use((req, res, next) => {
  console.log("A request is coming into auth route");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "auth API is working.",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email has already been registered");

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({
      msg: "success",
      savedObject: newUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(400).send(err);
    if (!user) return res.status(401).send("User not found");
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) return res.status(400).send(err);
      if (!isMatch) return res.status(401).send("Wrong password");
      const tokenObj = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
      res.status(200).send({ success: true, token: "JWT " + token, user });
    });
  });
});

module.exports = router;
