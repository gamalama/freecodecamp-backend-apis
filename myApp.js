require('dotenv').config();
let express = require('express');
let app = express();

console.log('Hello World');

// app.get('/', function(req, res) {
//   res.send('Hello Express');
// });

app.use('/', function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use('/public', express.static(`${__dirname}/public`));

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

module.exports = app;
