const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let type = "";
        // console.log(file);
        if (file.minetype === "application/octet-stream" || !file.mimetype) type = ".png"
        cb(null, Date.now() + '-' + file.originalname + type)
    }
})

const upload = multer({
    storage
})
module.exports = upload;