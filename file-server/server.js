const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const tokenRoute = require('./src/mock_token/tokenRoute');
const getFilesTree = require('./src/getFilesTree');

const app = express();
const http = require('http').Server(app).listen(3005);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload());
tokenRoute(app);


console.log('SERVER STARTED');


app.post("/", function(req, res){
    if (req.files) {
        console.log(req.files);
    }
});

// const basicPath = path.join(__dirname, 'server.js');
// const filebase = [];

// recurrentFileTreeBuild('.', 'filebase', filebase);
// const json = JSON.stringify(filebase);
// fs.writeFileSync('filebaseTree.json', json, 'utf8');