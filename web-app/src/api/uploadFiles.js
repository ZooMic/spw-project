import axios from 'axios';
import getToken from '../api/getToken';

export default function uploadFiles(projectName, files, callback) {
    const timestamp = (new Date()).getTime();
    const uploaders = files.map(file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("token", getToken());
        formData.append("projectName", projectName);
        formData.append("timestamp", timestamp)
        
        return axios.post("http://localhost:3005/upload-files", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then((response) => {
            callback(response, file);
        });
    });

    return axios.all(uploaders);
};