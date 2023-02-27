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
  getMonthlyPlan,
} = require('../controllers/tourController');

const { protect } = require('../controllers/authController');

//router.param('id', checkId);

//Router
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/tour-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopCheapTours, getAllTours);
router.route('/').get(protect, getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour);
//.delete(protect, restrictTo('admin'), deleteTour);

module.exports = router;
