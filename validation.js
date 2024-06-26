const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const register = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().required()
    

  });


module.exports = {
  login,
  register
};
