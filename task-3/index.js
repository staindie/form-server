const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fetch = require('node-fetch');
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

async function readItems() {
    const readFile = util.promisify(fs.readFile);
    try {
        const result =  await readFile(itemsFilePath);
        return JSON.parse(result);
    } catch (err) {
        return {};
    }
}

async function saveItems(items) {
    const writeFile = util.promisify(fs.writeFile);
    try {
        return await writeFile(itemsFilePath, JSON.stringify(items));
    } catch (err) {
        return err;
    }
}

async function getFullResponse(res) {
    return {
        ok: res.statusText,
        status: res.status,
        body: await res.json(),
        headers: res.headers
    }
}

function transformRequestBody(body) {
    if (body.method === 'GET') {
        delete body.body;
    }
    if (body.contentType) {
        body.headers.contentType = body.contentType;
        delete body.contentType;
    }
    return body;
}

function validateFormData(form) {
    const urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    let result = { success: false };
    if (!urlPattern.test(form.url)) {
        result.error = 'invalid URL format';
    } else if (form.headers && !IsJsonString(form.headers)) {
        result.error = 'invalid params, it should contain a valid JSON';
    } else if (form.body && !IsJsonString(form.body)) {
        result.error = 'invalid body, it should contain a valid JSON';
    } else {
        result.success = true;
    }
    return result;
}

function  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

app.get('/requests-list', async function (req, res) {
    let reqItems = await readItems();
    res.send(reqItems);
});

app.post('/send-request', async function ({ body}, res) {
    const { url, ...options } = transformRequestBody(body);
    let result = validateFormData(body);
    if (result.success) {
        try {
            const response = await fetch(url, options);
            result.payload = await getFullResponse(response);
        } catch (err) {
            result = {
                success: false,
                error: err.toString()
            };
        }
    }
    res.send(result);
});

app.post('/save-request', async function ({ body }, res) {
    let result = validateFormData(body);
    if (result.success) {
        let reqItems = await readItems();
        let { url } = body;
        reqItems[url] = body;
        await saveItems(reqItems);
    }
    res.send(result);
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/fe/index.html');
});

app.listen(port, function () {
    console.log('App listening on port 7782!');
});
