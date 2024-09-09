const UserLogin = require('../../../models/userLogin.js');
const BuyLogin = require('../../../models/buyLogin.js');

const generateUsername = (fullName) => {
  const nameWithoutSpaces = fullName.replace(/\s+/g, '').toLowerCase();
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${nameWithoutSpaces}${randomNumber}`;
};

const updateBuyLoginStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const buyLoginEntry = await BuyLogin.findById(id);

    if (!buyLoginEntry) {
      return res.status(404).json({ message: 'BuyLogin entry not found' });
    }

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Invalid status' });
    }

    buyLoginEntry.status = status;

    if (status === 'rejected') {
      await buyLoginEntry.save();
      return res.status(200).json({ message: 'BuyLogin entry rejected', data: buyLoginEntry });
    }

    // Status is 'approved'
    const { fullName } = buyLoginEntry;
    const username = generateUsername(fullName);

    // Check if the username already exists
    const existingUser = await UserLogin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Update BuyLogin entry with the new username
    buyLoginEntry.username = username;
    await buyLoginEntry.save();

    // Create a new UserLogin entry
    const newUserLogin = new UserLogin({
      username,
      password: null, // Assuming password is not required or handled elsewhere
    });
    await newUserLogin.save();

    res.status(201).json({
      message: 'BuyLogin entry approved and user login created successfully',
      data: {
        username,
        userLogin: newUserLogin,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateBuyLoginStatus };
