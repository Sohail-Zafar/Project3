const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  check,
  validationResult
} = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @Route   GET api/profile/me
// @Desc    Get Current users Profile
// @Access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user',
      ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this User'
      });
    }

    res.json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error')
  }
});

// @Route   POST api/profile/
// @Desc    Create or update users Profile
// @Access  Private

router.post('/',
  [
    auth,
    [
      check('medium', 'medium is Required')
      .not()
      .isEmpty()
    ]
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      medium,
      bio,
      youtube,
      facebook,
      linkedin,
      instagram
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (medium) profileFields.medium = medium;
    if (bio) profileFields.bio = bio;

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (profile) {
        // update 
        profile = await Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        });

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   get api/profile/
// @Desc    get all users Profile
// @Access  Public
router.get('/', async (req, res) => {
  try{
    const profiles = await Profile.find().populate('name', ['name', 'avatar']);
    res.json(profiles);
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   get api/profile/user/:userid
// @Desc    get  users Profile by id
// @Access  Public

router.get('/user/:user_id', async (req, res) => {
  try{
    const profile = await Profile.findOne({
       user: req.params.user_Id})
       .populate('user',
     ['name', 'avatar']);

     if(!profile) 
      return res.status(400).json({ msg: 'There is no Profile for this user'});

     res.json(profile);
  } catch(err) {
    console.log(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: ' Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @Route  delete api/profile
// @Desc   Delete profile, user & posts
// @Access  private

router.delete('/', async (req, res) => {
  try{
    // todo -- remove user posts

    // remove profile 
     await Profile.findOneAndRemove({ user: req.user_id});
    // remove user
     await User.findOneAndRemove({ _id: req.user_id});

    res.json({ msg: ' User Deleted'});
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;