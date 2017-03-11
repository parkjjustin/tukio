import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import users from './controllers/user_controller.js';
import test from './controllers/test_controller.js'
// import mongo from 'mongodb';
// import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost/mern');
// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.log("Mongoose Error: ", err);
// });

// db.once("open", () => {
//   console.log("Mongoose connection successful.");
// });

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.use('/api/users', users);
app.use('/api/test', test);

app.listen(port);
console.log("Server started")
