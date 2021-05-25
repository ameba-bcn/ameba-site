// https://bezkoder.com/react-hooks-redux-login-registration-example/
export default function authHeader() {
    const access = JSON.parse(localStorage.getItem('access'));

    if (access) {
        return { Authorization: 'Bearer ' + access };
    } else {
        return {};
    }
}