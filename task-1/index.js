const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 7780;

function createForm(loginValue = '') {
  let formTemplate = fs.readFileSync('task-1/form.html'),
      loginTemplate = '{login}';
  return formTemplate.toString().replace(loginTemplate, loginValue);
}

app.get('/', function (req, res) {
  res.send(createForm());
});

app.get('/login', function (req, res) {
  let { login, password } = req.query;
  let response;

  if (login && password) {
    response = `Hi ${login}! You have logged in successfully!`;
  } else {
    response = 'Sorry, something went wrong... Please try again' + createForm(login);
  }

  res.send(response);
});

app.listen(port, function () {
  console.log('App listening on port 7780!');
});
