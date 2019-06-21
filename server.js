const express = require ("express");
const mongoose = require("mongoose");


// My package
mongoose.connect("mongodb://localhost:27017/fs04-xedike",{userNewUrlParser: true})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

const app = express();
//parsermidlleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/uploads",express.static("uploads"));

//router
app.use("/api/users",require("./api/"));
app.use("/api/trips", require("./api/trips"))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}` );
});
