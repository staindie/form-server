const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const util = require('util');
const { logLineAsync } = require('../utils');

const app = express();
const port = process.env.PORT || 7782;
const path = require('path');
const itemsFilePath = './task-3/requests.json';
const logFN = path.join(__dirname, '_server.log');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(upload.array());
app.use(express.static(__dirname + '/fe', { etag: true }));
app.use(function (req, res, next) {
    logLineAsync(logFN,`[${port}] `+"server called, originalUrl="+req.originalUrl);
    next();
});

const readItems = async () => {
    const readFile = util.promisify(fs.readFile);
    try {
        const result =  await readFile(itemsFilePath);
        return JSON.parse(result);
    } catch (err) {
        return {};
    }
};

const saveItems = async (items) => {
    const writeFile = util.promisify(fs.writeFile);
    try {
        return await writeFile(itemsFilePath, JSON.stringify(items));
    } catch (err) {
        return err;
    }
};

const validateFormData = (form) => {
    return true;
};

app.post('/send-request', function (req, res) {
    console.log(req.body);
    res.send('request sent');
});

app.post('/save-request', async function (req, res) {
    let reqItems = await readItems();
    let { url } = req.body;
    reqItems[url] = req.body;
    await saveItems(reqItems);
    console.log(reqItems);
    res.send('request sent');
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/fe/form.html');
});

app.listen(port, function () {
    console.log('App listening on port 7782!');
});
