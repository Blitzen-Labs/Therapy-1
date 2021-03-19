import express, { request, response } from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(router);
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!")
});

