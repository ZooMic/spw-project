const searchFilebase = require('../helpers/search_filebase');

function filesUploadRoute(app) {
    app.get('/get-files-tree', (req, res) => {
        res.send(searchFilebase.createFilebaseTree(req.token.username));
    });


    app.post('/upload-files', (req, res) => {
        if (req && req.body) {
            const { projectName, files } = req.body;
            if (projectExist(projectName)) {

            }
        } else {
            return req.status(500).send('Server error!');
        }

        if (req) {
            const token = req.token;
            if (token) {
                if (token.type === 'admin') {

                } else {
                    return 
                }
            }
        }

        let token = token;
        if (req.body) {
            token = req.body.token;
        }
        console.log('TOKEN1', token);
        
        if (token) {
            console.log('TOKEN', req);

            // if (Object.keys(req.files).length == 0) {
                // console.log('STUF!');
            // } else {
                // console.log('asd', req.files);
            // }
        }
        res.send('Response!');
    });
}

module.exports = filesUploadRoute;