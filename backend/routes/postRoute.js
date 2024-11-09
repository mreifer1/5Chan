import express from 'express';
import { Userpost } from '../models/postModel.js';
import { Usercomment } from '../models/comment.js';

const router = express.Router();

// creates post in data base
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.text
        ){
          return response.status(400).send({
            message: 'Send all required fields: title, author, text',
          });  
        }
        const newPost = {
            title: request.body.title,
            author: request.body.author || 'Anonymous',
            text: request.body.text,
        };

        const Upost = await Userpost.create(newPost);
        return response.status(201).send(Upost); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );
// creates comment in data base 
router.post('/comment', async (request, response) => {
    try{
        if(
            !request.body.text
        ){
          return response.status(400).send({
            message: 'Send all required fields: text',
          });  
        }
        const newComment = {
            author: request.body.author || 'Anonymous',
            text: request.body.text,
        };

        const createdComment = await Usercomment.create(newComment);
        return response.status(201).send(createdComment); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} ); 
// get posts
router.get('/', async (req, res) => {
    try {
        const posts = await Userpost.find(); 
        return res.status(200).send(posts); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// deleting a post
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const result = await Userpost.findByIdAndDelete(id);
        if(!result){
            response.status(404).json({ message: 'Post not found'});
        }
        return response.status(200).send({ message: 'Post deleted successfully' })
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}); 

// JASH Upvote a post
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

// JASH Downvote a post
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