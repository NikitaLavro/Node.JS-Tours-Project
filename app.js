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

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
