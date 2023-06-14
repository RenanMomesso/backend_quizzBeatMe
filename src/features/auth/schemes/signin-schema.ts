import Joi, { ObjectSchema } from 'joi';

const signinSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().min(3).max(8).required().messages({
    'string.base': 'Username should be a type of string',
    'string.empty': 'Username should not be empty',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
  }),
  password: Joi.string().min(3).max(8).required().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password should not be empty',
    'string.min': 'Password should have a minimum length of {#limit}',
    'string.max': 'Password should have a maximum length of {#limit}',
  }),
});

export { signinSchema };
