const User = require('../model/User');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { registerValidation, loginValidation } = require('../validation');

//REGISTER
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user existed
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    // res.send(savedUser); not a good idea to send hashing pwd
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post('/login');

module.exports = router;
