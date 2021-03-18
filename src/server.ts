import express from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(router);
app.use(cors());

app.listen(12334, () => {
    console.log("Server is running!")
});

