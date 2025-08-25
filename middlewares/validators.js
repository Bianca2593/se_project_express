const { celebrate, Joi, Segments } = require('celebrate');

const objectId = Joi.string().hex().length(24);
const url = Joi.string().uri({ scheme: ['http', 'https'] });

/** Auth */
const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
    avatar: url.optional(),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

/** Users */
const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: url.optional(),
  }),
});

/** Clothing items */
const validateItemCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: url.required(),
  }),
});

const validateItemIdParam = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: objectId.required(),
  }),
});

/** (ex.) acceptă headere necunoscute când ai nevoie */
const acceptUnknownHeaders = celebrate({
  [Segments.HEADERS]: Joi.object().unknown(true),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdateProfile,
  validateItemCreate,
  validateItemIdParam,
  acceptUnknownHeaders,
};