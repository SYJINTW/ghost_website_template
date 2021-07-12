const Joi = require("joi");

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const feedbackValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    content: Joi.string().required(),
  });
  return schema.validate(data);
};

const foodValidation = data => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    quantity: Joi.string().required(),
    store: Joi.string().required().valid("常溫", "冷藏", "冷凍"),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.feedbackValidation = feedbackValidation;
module.exports.foodValidation = foodValidation;
