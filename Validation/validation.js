//Validation
const joi = require("@hapi/joi");

//Register Validation
const RegisterValidation=(data)=>{

    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
      });
      

      return schema.validate(data);
    

}


//Login Validation
const LoginValidation=(data)=>{

    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
      });
      

      return schema.validate(data);
    

}

module.exports.RegisterValidation=RegisterValidation;

module.exports.LoginValidation=LoginValidation;