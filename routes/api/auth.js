const express = require('express');
const router = express.Router()
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {
  check,
  validationResult
} = require('express-validator/check');

const User = require('../../models/User');

// @Route   GET api/auth
// @Desc    Test Route
// @Access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route   POST api/auth
// @Desc    Authintcate  User and get token
// @Access  Public

router.post('/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required')
    .exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('failure1')
      return res.status(400).json({
        errors: errors.array()
        
      });
    }

    const {
      email,
      password
    } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({
        email
      });

      if (!user) {
        console.log('failure2')
        return res
        
          .status(400)
          .json({
            errors: [{
              msg: "Invalid credintals"
            }]
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('failure3')
        return res
          .status(400)
          .json({
            errors: [{
              msg: "Invalid credintals"
            }]
          });
      }

      // return jsonwebtokin
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // expires in 1 hour 
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token, id: user.id
          });
        });

      //res.send('User Registered');

    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error')
    }

  });

module.exports = router;