const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const path = require('path');
const mysql=require('mysql');

const { logLineAsync } = require('../utils');
const { newConnectionFactory, selectQueryFactory } = require('./db_utils');

const poolConfig = {
    connectionLimit : 2,
    host     : 'localhost',
    user     : 'test_user',
    password : 'testtest'
};

const app = express();
const port = process.env.PORT || 7783;
const logFN = path.join(__dirname, '_server.log');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(upload.array());
app.use(express.static(__dirname + '/fe', { etag: true }));
app.use(function (req, res, next) {
    logLineAsync(logFN,`[${port}] `+"server called, originalUrl="+req.originalUrl);
    next();
});

app.post('/post-query', async ({ body }, res) => {
    let connection=null;
    try {
        let pool = mysql.createPool({ ...poolConfig, database: body.dbSelector });
        connection=await newConnectionFactory(pool,res);
        let result = await selectQueryFactory(connection, body.query, []);
        res.send(result);
    }
    catch ( error ) {
        res.status(500).end();
        logLineAsync(logFN,`[${port}] `+error);
    }
    finally {
        if ( connection ) {
            connection.release();
        }
    }
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/fe/index.html');
});

app.listen(port, function () {
    console.log('App listening on port 7783!');
});
