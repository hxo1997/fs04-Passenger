const express = require ("express");
const mongoose = require("mongoose");


// My package
mongoose.connect("mongodb://localhost:27017/fs04-xedike",{userNewUrlParser: true})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

const app = express();


app.listen(port, () => {
    console.log(`Server is running on port: ${port}` );
});
