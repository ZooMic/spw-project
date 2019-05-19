const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes/index');


dotenv.config(); // LOADING ENVIRONMENT VARIABLES
process.env.CURRENT_PATH = __dirname;
console.log('ENV');
console.log('\tSECRET_KEY', process.env.SECRET_KEY);
console.log('\tCURRENT_PATH', process.env.CURRENT_PATH);




/* ROUTES */
// const tokenRoute = require('./src/mock_token/tokenRoute');
// const filesUploadRoute = require('./src/filesUpload');


const getFilesTree = require('./src/getFilesTree');

const app = express();
const http = require('http').Server(app).listen(3005);

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload());

routes(app);


/* APPLY ROUTES */
// tokenRoute(app);
// filesUploadRoute(app);

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