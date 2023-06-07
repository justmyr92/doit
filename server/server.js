const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const todolistRouter = require('./routes/Todolist');
const UserRouter = require('./routes/User');


const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/todolist', todolistRouter);
app.use('/api/user', UserRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

