import axios from 'axios';
import getToken from '../api/getToken';

export default function uploadFiles(projectName, files) {
    const formData = new FormData();

    formData.append('token', getToken());
    formData.append('projectName', projectName);
    for (let i = 0; i < files.length; i++) {
        formData.append(`files[${i}]`, files[i]);
    }

    return axios.post('http://localhost:3005/upload-files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}