const jwt = require("jsonwebtoken");


authenticating = (req,res,next) => {
    // verify token 
    // if success return next()
    // if false return res.json(err)
    const token = req.header("Authorization")
    try{
        const decoded = jwt.verify(token, "Cybersoft")
        console.log("TCL: authenticating -> decoded: ", decoded)
        req.user = decoded;
        next()
    } catch(error) {
        res.status(403).json({errors: "you can not see it"})
    }
}
//User: passenger, driver, admin
const authorizing = (userTypeArray) => {
    return (req,res,next) => {
        const {userType} = req.user;
        //userTypeArray: ds cac nguoi dung co the truy cap
        //userType: loai nguoi dung hien tai (lay tu decoded token)
        //neu userTypeArray co chua userType => next

        if(userTypeArray.indexOf(userType) > -1) {
            return next()
        } else {
            res.status(403).json({errors:"you have logined but still not allowed to see this"})
        }

    }
}

module.exports = {
    authenticating, authorizing
}