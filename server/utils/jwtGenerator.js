const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id){
    const payload = {
        userId:user_id
    }

    return jwt.sign(payload,process.env.SECRETKEY,{expiresIn : "1hr"});
}

module.exports = jwtGenerator;