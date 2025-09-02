const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

function avatarUrlValidator(v) {
  return validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true });
}

function emailValidator(v) {
  return validator.isEmail(v);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Minimum name length is 2'],
    maxlength: [30, 'Maximum name length is 30'],
    default: 'Jacques Cousteau',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: avatarUrlValidator,
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: emailValidator,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Error('Unauthorized');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('User', userSchema);