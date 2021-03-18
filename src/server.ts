import express from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';

const app = express();
const cors = require('cors');
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.use((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    app.use(cors());
});

app.listen(port, () => {
    console.log("Server is running!")
});

