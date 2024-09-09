const ApiError = require('../../../utills/apiError/apiError.js');

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Invalid username or password:", username, password);
      throw new ApiError(400, "Credentials required");
    }

    if (username !== "abc@gmail.com" || password !== "qwerty123") {
      throw new ApiError(401, "Invalid Credentials");
    }


    const response = {
      success: true,
      message: "Sign-in successful",
    
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Admin Sign-in Error:", error);
    next(error); 
  }
};

module.exports = { signIn };
