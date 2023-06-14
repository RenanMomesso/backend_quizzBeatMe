import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
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
  email: Joi.string().required().email().messages({
    'string.base': 'Email should be a type of string',
    'string.empty': 'Email should not be empty',
    'string.email': 'Email should be a valid email',
  }),
  avatarColor: Joi.string().required().messages({
    'any.required': 'Avatar color is required',
  }),
  avatarImage: Joi.string().required().messages({
    'any.required': 'Avatar image is required',
  }),
});

export { signupSchema };
