const Tour = require('../models/tourModel');

//Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getCheckoutSession = (req, res, next) => {
  // 1) Get currently booked tour
  // 2) Create checkout session
  // 3) Send it to client
};
