const dotenv = require('dotenv');
dotenv.config(); // LOADING ENVIRONMENT VARIABLES
process.env.CURRENT_PATH = __dirname;

const express = require('express');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/index');
const path = require('path');


const app = express();
const http = require('http').Server(app); 

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload({
    limits: { fileSize: 256 * 1024  * 1024 },
    useTempFiles : true,
    tempFileDir: path.join(process.env.CURRENT_PATH, 'tmp/'), // 256 MiB
    createParentPath: true,
}));
routes(app);

http.listen(3005);
console.log('Server listening on http://localhost:3005');