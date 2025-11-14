import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]+$/)
    .min(6)
    .max(20)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/)
    .min(6)
    .max(30)
    .required(),
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(2)
    .max(20)
    .required(),
});
