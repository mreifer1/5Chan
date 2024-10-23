import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Userpost } from './models/postModel.js';
import postRoute from './routes/postRoute.js';
import cors from 'cors'; 

const app = express();

// parses requests body
app.use(express.json());

// middleware for handling cors policy
app.use(cors()); 

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Server is working')
});

// handles all routes
app.use('/posts', postRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
