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
  getToursWithin,
} = require('../controllers/tourController');

const { protect, restrictTo } = require('../controllers/authController');

const reviewRouter = require('./reviewRoutes');

//router.param('id', checkId);

//Router
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);
router.route('/tour-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopCheapTours, getAllTours);

router.route('/tours-within/:distance/center/:latlng/:unit', getToursWithin);
//tours-distance?distance=233&center=-40,45&unit=mi
//tours-distance/233/center/-40,45/unit/mi

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
