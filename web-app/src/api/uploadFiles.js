import axios from 'axios';
import getToken from '../api/getToken';

export default function uploadFiles(projectName, files) {
    let sizeCount = 0;
    const uploaders = files.map(file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("token", getToken());
        formData.append("projectName", projectName);
        return axios.post("http://localhost:3005/upload-files", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            sizeCount += files.size;
            console.log('TOTAL SIZE', sizeCount);
            console.log('RESPONSE', response);
        });
    });

    return axios.all(uploaders);
}