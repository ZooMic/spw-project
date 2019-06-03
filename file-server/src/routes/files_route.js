const fs = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');
const searchFilebase = require('../helpers/search_filebase');
const createTimestampName = require('../helpers/create_timestamp_name');

function filesUploadRoute(app) {
    app.get('/get-files-tree', (req, res) => {
        res.send(searchFilebase.createFilebaseTree(req.token));
    });

    app.get('/get-file', (req, res) => {
        const { filePath } = req && req.query || {};
        const { token } = req || {};

        const [project, archive, file] = filePath.split('/');
        
        if(!(project && archive && file)) {
            res.status(400).send({ message: 'File path is incorrect' });
            return;
        }

        if (!searchFilebase.canUserView(token, project)) {
            res.status(400).send({ message: 'You can not access this file' });
            return;
        }

        const data = fs.readFileSync(path.join(process.env.CURRENT_PATH, 'filebase', project, archive, file));

        res.status(200).send({ data: data.toString() });
    });

    app.post('/upload-files', (req, res) => {
        const user = req.token || {};
        const { username, type } = user;
        const { projectName, timestamp } = req.body || {};
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
                fs.writeFileSync(path.join(projPath, 'meta.json'), JSON.stringify({
                    latest: '',
                    list: [],
                    specification: [],
                    admin: username,
                    users: [username],
                }), 'utf8');
                const filebase = searchFilebase.getFilebase();
                filebase.list.push(projectName);
                searchFilebase.setFilebase(filebase);
            } else {
                res.status(403).json({ message: 'You can not create project as regular user! Admin rights required.' });
                return;
            }
        }
        
        // IF PROJECT EXIST - AND USER CAN MODIFY IT
        if (searchFilebase.canUserView(user, projectName)) {
            const archiveName = createTimestampName(timestamp);
            const savePath = path.join(process.env.CURRENT_PATH, 'filebase', projectName, archiveName);
            const latest = searchFilebase.getLatest(projectName);
            const meta = require(path.join(process.env.CURRENT_PATH, 'filebase', projectName, 'meta.json'));
            meta.latest = archiveName;
            if (!meta.list.find(i => i === archiveName)) {
                meta.list.push(archiveName);
            }
            fs.writeFileSync(path.join(process.env.CURRENT_PATH, 'filebase', projectName, 'meta.json'), JSON.stringify(meta), 'utf8');

            fs.mkdirSync(savePath, { recursive: true });
            if (latest && latest !== archiveName) {
                ncp(path.join(process.env.CURRENT_PATH, 'filebase', projectName, latest), savePath, (err) => {
                    if (err) {
                        console.error('NCP', err);
                        res.status(500).json({ message: 'Internal error!' });
                        return;
                    }
    
                    file.mv(path.join(savePath, file.name));
                    res.status(200).json({ message: 'File saved correctly' });
                });
            } else {
                
                file.mv(path.join(savePath, file.name));
                res.status(200).json({ message: 'File saved correctly' });
            }
        } else {
            res.status(404).json({ message: 'You can not modify project!' });
        }
        console.log('');
    });
}

module.exports = filesUploadRoute;