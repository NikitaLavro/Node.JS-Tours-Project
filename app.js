//Core
const fs = require('fs');

//Express
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

//Files
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 80;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
