import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  age: Joi.number().min(12).max(60).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(5).max(20),
  age: Joi.number().min(12).max(60),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

const searchSchema = Joi.object({
  name: Joi.string().max(10),
  age: Joi.number().min(12).max(60),
});

export default {
  signupSchema,
  signinSchema,
  updateSchema,
  searchSchema,
};
