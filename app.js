//EXPRESS IMPORTS
const express = require('express');

//DEPENDENCIES
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

//APP IMPORTS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//ROUTER IMPORTS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES

//Security HTTP headers
app.use(helmet());

//Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

//Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(globalErrorHandler);

//APP ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`), 404);
});

module.exports = app;
