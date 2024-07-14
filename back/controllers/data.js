const Data = require("../models/data");
const ErrorResponse = require("../utils/errorResponse");

//Add Data
exports.addData = async (req, res, next) => {
  try {
    const data = await Data.create(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Data
exports.getData = async (req, res, next) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Data is not found`, 404));
  }
};
