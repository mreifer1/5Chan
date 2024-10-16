import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (request, responce) =>{
    console.log(request)
    return responce.status(234).send('Server is working')
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
})
