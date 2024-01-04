require('dotenv').config();
let express = require('express');
let app = express();

// Meet the Node console
console.log('Hello World');

// app.get('/', function(req, res) {
//   res.send('Hello Express');
// });

// Implement a Root-Level Request Logger Middleware
app.use('/', function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve an HTML File
app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Serve Static Assets
app.use('/public', express.static(`${__dirname}/public`));

// Use the .env File and Serve JSON on a Specific Route
app.get('/json', function(req, res) {
  let message;
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = 'HELLO JSON';
  } else {
    message = 'Hello json';
  }
  res.json({
    'message': message,
  });
});

// Chain Middleware to Create a Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({
    'time': req.time,
  });
});

// Get Route Parameter Input from the Client
app.get('/:word/echo', function(req, res) {
  let word = req.params.word;
  res.json({
    'echo': word,
  });
});

// Get Query Parameter Input from the Client
app.route('/name').get(function(req, res) {
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({
    'name': `${firstname} ${lastname}`,
  });
});

module.exports = app;
