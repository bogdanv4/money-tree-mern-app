const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

//USER SIGN UP
exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new ErrorResponse(`E-mail already exists`, 400));
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//USER LOGIN
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse(`Email and password are required`, 400));
    }

    //Check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse(`Invalid credentials - email doesn't exist`, 400)
      );
    }

    //Verify password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(
        new ErrorResponse(`Invalid credentials - password doesn't match`, 400)
      );
    }

    generateToken(user, 200, res);
    // res.status(200).json({
    //   success: true,
    //   user,
    // });
  } catch (error) {
    console.log(error);

    next(new ErrorResponse(`Can not login, check your credentials`, 400));
  }
};

//Generate cookie and token
const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(process.env.EXPIRE_TOKEN)),
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//USER LOGOUT
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

//USER PROFILE
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

//USER
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(`User with id: ${req.params.id} is not found`, 404));
  }
};
