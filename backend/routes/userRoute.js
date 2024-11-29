import express from 'express';
import { user } from '../models/user.js';
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
                {$push: {refreshTokens : refreshToken}}
            );

                //Testing
            const searchedUser = await user.findOne({username : reqUser, email : reqEmail});
            console.log("Updated User Tokens: " + searchedUser);

            return response.status(200).send({
                message: "Login Sucessful",
                accessToken: accessToken
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
})

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

    //Create new refresh token
router.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401).send("No Token");
    
    // const searchedUser = await user.findOne({username : userAuth});
    console.log("Requested User Token: " + refreshToken); //Test

    // if (!searchedUser.refreshTokens.includes(refreshToken)){
    //     return res.status(403).send("Invalid Token");
    // }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userAuth) => {
        if (err) return res.status(403).send("Invalid Token")
        const accessToken = generateAccessToken({name : userAuth.name});
        await user.updateOne( //Adds Refresh Token to user schema
            {username : reqUser},
            {$push: {refreshTokens : refreshToken}}
        );
        console.log("New access token: " + accessToken);
        res.json({ accessToken: accessToken});
    })
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