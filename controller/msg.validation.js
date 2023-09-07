import Joi from 'joi';

const addSchema = Joi.object({
  title: Joi.string().min(5).max(20).required(),
  body: Joi.string().required(),
  to: Joi.string().email({ minDomainSegments: 2 }).required(),
  id: Joi.number().required(),
});

export default {
  addSchema,
};
