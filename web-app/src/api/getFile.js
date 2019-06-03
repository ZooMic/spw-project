import axios from 'axios';
import getToken from '../api/getToken';

export default function getFile(filePath) {
    return axios.get(`http://localhost:3005/get-file`, {
        params: {
            filePath,
            token: getToken(),
        },
    });
};