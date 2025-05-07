const express = require('express');
const cors = require('cors');
require('dotenv').config()

const db = require('./conn');
const router = require('./routes/userRoutes')


const app = express();
const port = process.env.PORT;


const User = require('./models/userLogin');

app.use(cors());
app.use(express.json());

app.use('/' , router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});