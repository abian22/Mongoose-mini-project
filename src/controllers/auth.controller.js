const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signUp = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1h' });
    console.log('user created');
    return res.status(201).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Cannot create user');
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).send('Email or password invalid');
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(403).send('Email or password invalid');
      }

      const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1h' });
      console.log('user logged');
      return res.status(201).json({ token: token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  signUp,
  login
};
