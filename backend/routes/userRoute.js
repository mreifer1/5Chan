import express from 'express';
import { user } from '../models/user.js';
import { report } from '../models/report.js';
import bcrypt from 'bcrypt';


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

        //Encrypt Password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const newUser = {
            email: request.body.email,
            username: request.body.username,
            password: hashedPassword,
        };

        const User = await user.create(newUser);
        return response.status(201).send(User); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

// Log In
router.post('/login', async (request, response) => {
    const reqUser = request.body.username;
    const reqPass = request.body.password;
    const reqEmail = request.body.email;
    try{
            //Checks to see if requested username exists
        const searchedUser = await user.findOne({username : reqUser, email : reqEmail});
        console.log("You searched for: " + searchedUser);
        if (searchedUser == null){
            return response.status(400).send({
                message: "User doesn't exist or email is wrong",
              });
        }

            //Decrypt Password & Give Authentication
        if (bcrypt.compare(reqPass, searchedUser.password)){
            const searchedUser = await user.findOne({username : reqUser, email : reqEmail});

            return response.status(200).send({
                message: "Login Sucessful",
                user: searchedUser.username,
                email: searchedUser.email,
                _id : searchedUser._id
            });
            
        } else{
            return response.status(400).send({
                message: 'Username, Password, or Email is invalid',
                });
        }
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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

// creates report in data base
router.post('/report', async (request, response) => {
    try{
        if(
            !request.body.email ||
            !request.body.report_text
        ){
          return response.status(400).send({
            message: 'Send all required fields: email and report text',
          });  
        }
        const newReport = {
            email: request.body.email,
            report_text: request.body.report_text,
        };

        const Ureport = await report.create(newReport);
        return response.status(201).send(Ureport); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );


export default router;