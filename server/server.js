const path = require('path');

const express = require('express');
const app = express();

// import routers

//utility middleware
app.use(express.json());
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// use routers

// serve index
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// 404 handler
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  console.log(`server listening on port ${PORT}`);
});