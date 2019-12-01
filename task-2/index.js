const express = require('express');
const app = express();
const port = process.env.PORT || 7781;

const variants = [
  { id: '01', name: 'variant 1' },
  { id: '02', name: 'variant 2' },
  { id: '03', name: 'variant 3'}
];
let stat = {};

app.use(express.static(__dirname + '/fe'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/fe/index.html');
});

app.get('/variants', function (req, res) {
  res.json(variants);
});

app.get('/stat', function (req, res) {
  res.json(stat);
});

app.get('/vote', function (req, res) {
  let { id } = req.query;
  if (id && stat[id] && Number(stat[id])) {
    stat[id]++;
  } else {
    stat[id] = 1;
  }
  res.send();
});

app.listen(port, function () {
  console.log('App listening on port 7781!');
});
