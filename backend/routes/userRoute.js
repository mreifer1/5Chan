import express from 'express';
import { user } from '../models/user.js';
import { report } from '../models/report.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
                //Create Access and Refresh Tokens
            const userAuth = {name : reqUser};
            const accessToken = generateAccessToken(userAuth);
            const refreshToken = jwt.sign(userAuth, process.env.REFRESH_TOKEN_SECRET);
            await user.updateOne( //Adds Refresh Token to user schema
                {username : reqUser},
                {$set: {refreshTokenCurrent : refreshToken}}
            );

                //Testing
            const searchedUser = await user.findOne({username : reqUser, email : reqEmail});
            console.log("Updated User Tokens: " + searchedUser);

            return response.status(200).send({
                message: "Login Sucessful",
                accessToken: accessToken,
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

    //Create Access Token
function generateAccessToken(userAuth){
    return jwt.sign(userAuth, process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn: '10m' }
                );
    
}

    //Authenticates currently logged in user
export function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.status(400).send("No Auth Header");

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send("No Token");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userAuth) => {
        if (err) return res.status(403).send("Invalid Token")
        req.userAuth = userAuth;
        next();
    })
}

    //Checks refresh token
router.post('/token', authenticateToken, async (req, res) => {
    
    // Check the accessToken that was sent and verify it.
    // If correct, find the refreshToken associated with current user and
    // verify that. If that is correct, then create a new accessToken and
    // send it back.

    const currentUser = await user.findOne({username : req.userAuth.name});
    console.log("This is the current user: " + currentUser);

    const refreshToken = currentUser.refreshTokenCurrent;
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userAuth) => {
        if (err) return res.status(403).send("Token Expired")
        const accessToken = generateAccessToken({name : req.userAuth.name});
        
        console.log("New access token: " + accessToken);
        res.status(200).json({ accessToken: accessToken});
    })
});

    //Delete Tokens and Log Out
router.delete('/logout', authenticateToken, (req, res) => {
    
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