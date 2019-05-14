const express = require('express');
//const gravatar = require ('gravitar');
const bcrypt = require ('bcryptjs');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator/check');

const User = require('../../models/User.js');


    // @Route   POST api/users
    // @Desc    Register User
    // @Access  Public
    router.post('/', [
        check('name', "name is required")
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'please enter a password with 6 or more characters').isLength({
          min: 6
        })
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          });
        }

        const { name, email, password } = req.body;

        try {
        // see if user exists
            let user = await User.findOne({email});

            if(user) {
              res.status(400).json({ errors: [{msg: "User allready exsits"}] });
            }
        // get users gravitar
            // const avatar = gravatar.url(email, {
            //   s:'200',
            //   r:'pg',
            //   d: 'mm'
            // })

            user = new User ({
              name,
              email,
              
              password
            })

        // encrypy password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

        // return jsonwebtokin


        res.send('User Registered');

        } catch(err) {
            console.log(err.message);
            res.status(500).send('server error')
        }
       
      });


    module.exports = router;