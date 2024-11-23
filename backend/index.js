import express from "express";
import mongoose from "mongoose";
import { Userpost } from './models/postModel.js';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors'; 
import * as dotenv from "dotenv";

dotenv.config(); 

const app = express();

// parses requests body
app.use(express.json());

// middleware for handling cors policy
app.use(cors()); 

app.use(express.static('public'));

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Server is working')
});

// handles all routes for posts
app.use('/posts', postRoute);
// handles all routes for users
app.use('/user', userRoute);


mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log('App is connected to database')
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
