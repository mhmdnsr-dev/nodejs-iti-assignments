import joi from 'joi';

const signUp = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(6).required(),
  age: joi.number(),
  gender: joi.string(),
  phone: joi.string().required(),
});
const signIn = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(6).required(),
});

const update = joi.object({
  name: joi.string(),
  age: joi.number(),
  gender: joi.string(),
  phone: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
  newPass: joi.string().min(6),
  // .when('oldPass', { is: joi.exist(), then: joi.required() }),
  oldPass: joi
    .string()
    .min(6)
    .when('newPass', { is: joi.exist(), then: joi.required() }),
});
// const changePass = joi.object({
//   oldPass: joi.string().required(),
//   newPass: joi.string().required(),
// });

export default {
  signUp,
  signIn,
  // changePass,
  update,
};

// signUp.validateAsync({}, { abortEarly: false }).then(
//   value => console.log('value'),
//   reson => console.log('Eccor')
// );
// signUp.validate({}, { abortEarly: false, errors: { stack: true } });
