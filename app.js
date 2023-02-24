//Dependencies
const morgan = require('morgan');

//Express
const express = require('express');
const app = express();

//Routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
