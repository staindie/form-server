const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.sendfile('./form.html');
});

app.get('/login', function (req, res) {
  let { login, password } = req.query;
  let response;

  if (login && password) {
    response = `Hi ${login}! You have logged in successfully!`;
  } else {
    response = 'Sorry, something went wrong...';
  }

  res.send(response);
});

app.listen(port, function () {
  console.log('App listening on port 3000!');
});
