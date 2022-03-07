require('dotenv').config();
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT;
const userRouter = require('./server/api/users/user.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);






app.listen(port, () => console.log(`Listening at http://localhost:${port}`));