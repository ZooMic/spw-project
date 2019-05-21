const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const searchFilebase = require('../helpers/search_filebase');
const createTimestampName = require('../helpers/create_timestamp_name');

function filesUploadRoute(app) {
    app.get('/get-files-tree', (req, res) => {
        res.send(searchFilebase.createFilebaseTree(req.token.username));
    });


    app.post('/upload-files', (req, res) => {
        const { username, type } = req.token || {};
        const { projectName } = req.body || {};
        const { file } = req.files || {};
        
        if (!(username && type && projectName && file)) {
            res.status(400).json({ message: 'Invalid parameters!' });
            return;
        }

        if (searchFilebase.canUserView(username, projectName) || type === 'admin') {
            const archiveName = createTimestampName();
            const savePath = path.join(process.env.CURRENT_PATH, 'filebase', projectName, archiveName);
            
            fs.mkdirSync(savePath, { recursive: true });

            file.mv(path.join(savePath, file.name));
            res.status(200).json({ message: 'MV'});
        }


        // console.log("FILE", file);
        // req.fi
        // if (req && req.body) {
        //     const { projectName, files } = req.body;
        //     if (projectExist(projectName)) {

        //     }
        // } else {
        //     return req.status(500).send('Server error!');
        // }

        // if (req) {
        //     const token = req.token;
        //     if (token) {
        //         if (token.type === 'admin') {

        //         } else {
        //             return 
        //         }
        //     }
        // }

        // let token = token;
        // if (req.body) {
        //     token = req.body.token;
        // }
        // console.log('TOKEN1', token);
        
        // if (token) {
        //     console.log('TOKEN', req);

        //     // if (Object.keys(req.files).length == 0) {
        //         // console.log('STUF!');
        //     // } else {
        //         // console.log('asd', req.files);
        //     // }
        // }
        // res.send('Response!');
    });
}

module.exports = filesUploadRoute;