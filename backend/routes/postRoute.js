import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Userpost } from '../models/postModel.js';
import { authenticateToken } from '../routes/userRoute.js'

const __filename = fileURLToPath(import.meta.url); // converts file:///backend/routes/postRoute.js to -> just the path like /backend/routes/postRoute.js
const __dirname = dirname(__filename); // returns /backend/routes

const router = express.Router();

const storage = multer.memoryStorage(); //Using Memory storage instead of Disk storage
const upload = multer({ storage });

  //Testing User Authentication Tokens
// router.get('/', authenticateToken, (req, res) => {
//   //return res.json();
// })

// POST route to create a new post
router.post('/',upload.single('file'), async (request, response) => {
  try {
    if (!request.body.title || !request.body.text) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, text',
      });
    }

    const newPost = {
      title: request.body.title,
      author: request.body.author || 'Anonymous',
      text: request.body.text,
      image: request.file ? {
        buffer: request.file.buffer, //Image stored as buffer object and saved to Database
        originalName: request.file.originalname, //file name
        mimeType: request.file.mimetype //Type of image uploaded(jpeg, png ...)
      } : null,
    };

    const createdPost = await Userpost.create(newPost);
    return response.status(201).send(createdPost);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// POST route to create a comment
router.post('/:postId/comment', async (request, response) => {
  try {
    const { postId } = request.params; // Extract postId from request.params
    const { text, author } = request.body;

    if (!text) {
      return response.status(400).send({
        message: 'Send all required fields: text',
      });
    }

    const post = await Userpost.findById(postId);
    if (!post) {
      return response.status(404).send({ message: 'Post not found' });
    }

    const newComment = { text, author: author || 'Anonymous' };
    post.comments.push(newComment);
    await post.save();

    return response.status(201).send(post); // Return the updated post
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET posts
router.get('/', async (req, res) => {
  try {
    const posts = await Userpost.find();
    return res.status(200).send(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//GET image from /posts/{id}
router.get('/:id/image', async (request, response) => {
  try {
    const { id } = request.params;
    const post = await Userpost.findById(id);

    if (!post || !post.image) {
      return response.status(404).send({ message: 'Image not found' });
    }
    response.set('Content-Type', post.image.mimeType);
    response.send(post.image.buffer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE post by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Userpost.findByIdAndDelete(id);
    if (!result) {
      response.status(404).json({ message: 'Post not found' });
    }
    return response.status(200).send({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// PATCH to upvote a post
router.patch('/:id/upvote', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedPost = await Userpost.findByIdAndUpdate(
      id,
      { $inc: { vote: 1 } },
      { new: true }
    );
    response.status(200).send(updatedPost);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// PATCH to downvote a post
router.patch('/:id/downvote', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedPost = await Userpost.findByIdAndUpdate(
      id,
      { $inc: { vote: -1 } },
      { new: true }
    );
    response.status(200).send(updatedPost);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;