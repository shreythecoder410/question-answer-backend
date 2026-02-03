const Joi = require("joi")

class AuthValidation{
    static register(data){
        const schema = Joi.object({
            name:Joi.string().min(3).max(10).trim().required(),
            email:Joi.string().email().required().trim(),
            password:Joi.string().min(4).required(),
            
        })
        return schema.validate(data)
    }


    
}

module.exports = AuthValidation