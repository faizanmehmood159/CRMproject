const UserLogin = require('../../../models/userLogin.js');
const bcrypt = require('bcryptjs');

const setPassword = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserLogin.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Username not found' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password set successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { setPassword };
