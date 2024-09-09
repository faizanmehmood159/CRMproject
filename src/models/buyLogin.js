const mongoose = require('mongoose');

const buyLoginSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  username:{
    type: String,
  },
});

const BuyLogin = mongoose.model('Buy Login', buyLoginSchema);

module.exports = BuyLogin;
