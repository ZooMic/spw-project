export default function getToken() {
    let token = localStorage.getItem('token');
    token = token ? token : sessionStorage.getItem('token');
    return token;
}