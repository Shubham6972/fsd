require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.DATABASE_URL

mongoose.connect(dbUri)
.then(() => console.log("Connected to MongoDB with Mongoose"))
.catch(err => console.error("Connection error:", err));
