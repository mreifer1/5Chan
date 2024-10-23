import express from 'express';
import { Userpost } from '../models/postModel.js';

const router = express.Router();

// creates post in data base
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.text
        ){
          return response.status(400).send({
            message: 'Send all required fields: title, author, text',
          });  
        }
        const newPost = {
            title: request.body.title,
            author: request.body.author,
            text: request.body.text,
        };

        const Upost = await Userpost.create(newPost);
        return response.status(201).send(Upost); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

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

export default router; 