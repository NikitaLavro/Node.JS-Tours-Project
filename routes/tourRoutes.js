const express = require('express');

const router = express.Router();

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopCheapTours,
  getTourStats,
} = require('../controllers/tourController');

//router.param('id', checkId);

//Router
router.route('/tour-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopCheapTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
