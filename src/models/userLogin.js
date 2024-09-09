const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    default: null, 
  },

}, {
  timestamps: true, 
});

const UserLogin = mongoose.model('User Logins', userLoginSchema);

module.exports = UserLogin;
