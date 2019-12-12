const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { logLineAsync } = require('../utils');

const app = express();
const port = process.env.PORT || 7780;
const path = require('path');
const logFN = path.join(__dirname, '_server.log');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    logLineAsync(logFN,`[${port}] `+"server called, originalUrl="+req.originalUrl);
    next();
});

function createForm(loginValue = '') {
    let formTemplate = fs.readFileSync('task-1/form.html'),
        loginTemplate = '{login}';
    return formTemplate.toString().replace(loginTemplate, loginValue);
}

function createMainPage(loginValue = '') {
    return `Hi ${loginValue}! You have logged in successfully!`
}

app.get('/', function ({ cookies: { login }}, res) {
    if (login) {
        res.redirect(302, '/main');
    }
    res.send(createForm());
});

app.get('/main', function ({ cookies: { login }}, res) {
    if (!login) {
        res.redirect(302, '/');
    }
    res.send(createMainPage(login));
});

app.post('/login', function ({ body: { login, password }}, res) {
    if (login && password) {
        res.cookie('login', login);
        res.redirect(302, '/main');
    } else {
        res.send('Sorry, something went wrong... Please try again' + createForm(login));
    }
});

app.listen(port, function () {
    console.log('App listening on port 7780!');
});
