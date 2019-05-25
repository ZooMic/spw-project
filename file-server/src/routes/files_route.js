const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const searchFilebase = require('../helpers/search_filebase');
const createTimestampName = require('../helpers/create_timestamp_name');

function filesUploadRoute(app) {
    app.get('/get-files-tree', (req, res) => {
        res.send(searchFilebase.createFilebaseTree(req.token));
    });

    app.post('/upload-files', (req, res) => {
        const user = req.token || {};
        const { username, type } = user;
        const { projectName } = req.body || {};
        const { file } = req.files || {};
        
        // REQUEST MUST BE CORRECT
        if (!(username && type && projectName && file)) {
            res.status(400).json({ message: 'Invalid parameters!' });
            return;
        }

        // IF PROJECT NOT EXIST - ADMIN CAN CREATE ONE
        if (!searchFilebase.projectExist(projectName)) {
            if (type === 'admin') {
                const projPath = path.join(process.env.CURRENT_PATH, 'filebase', projectName);
                fs.mkdirSync(projPath, { recursive: true });
                fs.writeFile(path.join(projPath, 'meta.json', JSON.stringify({}), 'utf8', callback);
            } else {

            }
        }
        
        if (searchFilebase.canUserView(user, projectName) || type === 'admin') {
            const archiveName = createTimestampName();
            const savePath = path.join(process.env.CURRENT_PATH, 'filebase', projectName, archiveName);
            const latest = searchFilebase.getLatest(projectName);
            console.log('LATEST', latest);
            

            fs.mkdirSync(savePath, { recursive: true });


            file.mv(path.join(savePath, file.name));
            res.status(200).json({ message: 'MV'});
        }
    });
}

module.exports = filesUploadRoute;