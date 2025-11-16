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

export const signinSchema = Joi.object({
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
});

export const characterSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\d]+$/)
    .min(2)
    .max(20)
    .required(),
});

export const itemSchema = Joi.object({
  code: Joi.number().integer().positive().required(),
  name: Joi.string()
    .pattern(/^[A-Za-z\d]+$/)
    .min(2)
    .max(40)
    .required(),
  stats: Joi.object({
    health: Joi.number().integer().min(0).required(),
    power: Joi.number().integer().min(0).required(),
  }),
  price: Joi.number().integer().positive().required(),
});

export const itemModifyingShcema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\d]+$/)
    .min(2)
    .max(30),
  stats: Joi.object({
    health: Joi.number().integer().min(0).default(0),
    power: Joi.number().integer().min(0).default(0),
  }),
});
