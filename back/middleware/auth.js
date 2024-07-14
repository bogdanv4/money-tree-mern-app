const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

//Check is user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  //Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse("You must log in to access this resource", 401)
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      new ErrorResponse("You must log in to access this resource", 401)
    );
  }
};
