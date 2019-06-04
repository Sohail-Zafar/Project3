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
    // [
    //   check('url', 'Text is Required')
    //   .not()
    //   .isEmpty()
    // ],
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
// cloudanrt url goes in here
      const newPost = new Post({
        text: req.body.text,
        url: "res from cloudanry",
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
});

// @Route   PUT api/posts/unlike/:id
// @Desc    unlike a  post
// @Access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check is user has allready liked post
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'post has not been liked yet!'
      });
    }

    // get remove index
    const remoeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(remoeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

// @Route   POST api/posts/comment/:id
// @Desc    Comment on a post
// @Access  Private

router.post(
  '/comment/:id',
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
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment)
      await Post.save();

      res.json(comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// @Route   DELETE api/posts/comment/:id/:comment_id
// @Desc    Delete a comment
// @Access  Private

router.delete ('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // pulll out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // make sure comment exsists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // check if user made comment
    if(comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized'})
    }

    // get index to remove
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(posr.comments);

  } catch (err) {
    console.error(err.message);
      res.status(500).send('Server Error')
  }
});

module.exports = router;