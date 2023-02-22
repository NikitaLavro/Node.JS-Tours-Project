const fs = require('fs');

//Models
const Tour = require('../models/tourModel');

//Functions
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Include Body and Name' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  //const id = req.params.id * 1;

  //const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = (req, res) => {
  //const newId = tours.at(-1).id + 1;
  //const newTour = { ...req.body, id: newId };

  //tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`
    // JSON.stringify(tours),
    // (err) => {
    //   res.status(201).json({
    //     status: 'success',
    //     data: {
    //       tour: newTour,
    //     },
    //   });
    // }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
