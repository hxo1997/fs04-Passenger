const validator = require("validator");
const _ = require("lodash");
const {User} = require("../models/users");

const validateLoginInput = async (data) => {
    // define errors 
    let errors = {};
    data.email = _.get(data,"email", "");
    data.password = _.get(data,"password", "");
}