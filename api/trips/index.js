const express = require("express");
const {authenticating, authorizing} = require("../../middleware/auth");
const tripController = require("./trip");

const router = express.Router();

router.post("/create-trip",
    authenticating,
    authorizing(["driver"]),
    // (req, res) => {
    //     res.send("jsndkfj")
    // }
    tripController.createTrip
    )
router.post("/book-trip/:tripID",
    authenticating,
    authorizing(["passenger"]),

    tripController.bookTrip
    
    )

module.exports = router;