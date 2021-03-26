import express from 'express';
import { request, response } from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';

const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running!")
});



