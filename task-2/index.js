const express = require('express');
const bodyParser = require('body-parser');
const { toXML } = require('jstoxml');
const { transform: toHtml } = require('node-json2html');

const app = express();
const port = process.env.PORT || 7781;

const variants = [
  { id: '01', name: 'variant 1' },
  { id: '02', name: 'variant 2' },
  { id: '03', name: 'variant 3'}
];
let stat = {};

const mapStat = (stat) => variants.map(({ id, name }) => ({ name, value: stat[id] }));

// app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/fe', { etag: true }));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/fe/index.html');
});

app.get('/variants', function (req, res) {
  res.json(variants);
});

app.get('/stat', function (req, res) {
  res.json(stat);
});

app.get('/download-stat', function (req, res) {
  let { type } = req.query;
  let result;
  res.setHeader('Content-Disposition', 'attachment');
  switch (type) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      result = mapStat(stat);
      break;
    case 'xml':
      res.setHeader('Content-Type', 'application/xml');
      result = toXML(mapStat(stat));
      break;
    case 'html':
      const template = {'<>':'div','html':'${name}: ${value}'};
      res.setHeader('Content-Type', 'text/html');
      result = toHtml(mapStat(stat), template);
  }
  res.json(result);
});

app.post('/vote', function (req, res) {
  let { id } = req.body;
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
