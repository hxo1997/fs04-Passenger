const validator = require("validator");
const _ = require("lodash");
const {User} = require("../models/users");


validateRegisterInput = async (data) => {
    let errors = {};
   
    // check if input is empty or not
    // if empty => set empty string
    // data.email = data.email ? data.email : ""
    data.email = _.get(data,"email", "");
    data.password = _.get(data,"password", "");
    data.password2 = _.get(data, "password2", "");
    data.fullName = _.get(data,"fullName", "");
    data.userType = _.get(data, "userType", "");
    data.phone = _.get(data,"phone", "");
    data.DOB = _.get(data,"DOB", "");
    
    // validate
    if (validator.isEmpty(data.email)) { // true: "", false: has value
        errors.email = "Email is required"
    }
    else if (!validator.isEmail(data.email)){ // true: email is valid, false: email invalid
        errors.email = "Email is invalid"
    }
    else {
        const user = await User.findOne({email: data.email})
        if (user) errors.email = "Email is existed"
    }

    //password
    if (validator.isEmpty(data.password)){
        errors.password = "Password is required"
    } else if (!validator.isLength(data.password, {min: 6})){
        errors.password = "Password must have at least 6 characters"
    }

    //retype-password
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password is required"
    }
    else if (!validator.equals(data.password,data.password2)){
        errors.password2 = "Password is not match"
    }

    //userType
    if (validator.isEmpty(data.userType)){
        errors.userType = "UserType is required"
    }
    //phone
    if (validator.isEmpty(data.phone)){
        errors.phone = "Phone is required"
    }
    else {
        const user = await User.findOne({phone: data.phone})
        if(user) errors.phone = "Phone is existed"
    }
    //DOB
    if (validator.isEmpty(data.DOB)){
        errors.DOB = "Day of Birth is required"
    }
    return {
        // if errors is empty {} => true; else false
        isValid: _.isEmpty(errors),
        errors
    }
}

module.exports = validateRegisterInput;