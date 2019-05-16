const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  check,
  validationResult
} = require('express-validator/check');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// @Route   POST api/posts
// @Desc    Create a post
// @Access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is Required')
      .not()
      .isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @Route   GET api/posts
// @Desc    Get all posts
// @Access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    })
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

// @Route   GET api/posts/id
// @Desc    Get  posts by id
// @Access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'post not found'});
    }

      res.json(post)
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'post not found'});
    }
    res.status(500).send('Server Error')
  }
});

// @Route   DELETE api/posts/:id
// @Desc    Delete post
// @Access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found'});
    }

    // check user
    if(post.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized'});
    }

    await post.remove();

    res.json({ msg: 'post removed'})
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'post not found'});
    }
    res.status(500).send('Server Error')
  }
});

// @Route   PUT api/posts/like/:id
// @Desc    like a  post
// @Access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check is user has allready liked post
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'post already liked'});
    }

    post.likes.unshift({ user: req.user.id});

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})


module.exports = router;