import express from 'express';
import { user } from '../models/user.js';

const router = express.Router();

// creates user in data base
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.email ||
            !request.body.password ||
            !request.body.username
        ){
          return response.status(400).send({
            message: 'Send all required fields: email, password, username',
          });  
        }
        const newUser = {
            email: request.body.email,
            username: request.body.username,
            password: request.body.password,
        };

        const User = await user.create(newUser);
        return response.status(201).send(User); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

// Retrieves user from data base
router.post('/login', async (request, response) => {
    const reqUser = request.body.username;
    const reqPass = request.body.password;
    const reqEmail = request.body.email;
    try{
            //Checks to see if submitted username exists
        const searchedUser = await user.find({username : reqUser, password : reqPass, email : reqEmail});
        console.log("You searched for: " + searchedUser);
        if (searchedUser.length > 0){ 
            return response.status(200).send({message: "Login Sucessful"});
        } else{
            return response.status(400).send({
                message: 'Username, Password, or Email is invalid',
              });
        }

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

    
})

// deleting a user
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const result = await user.findByIdAndDelete(id);
        if(!result){
            response.status(404).json({ message: 'user not found'});
        }
        return response.status(200).send({ message: 'user deleted successfully' })
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}); 

export default router; 