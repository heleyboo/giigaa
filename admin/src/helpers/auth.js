export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function isAuthenticated() {
    const user = localStorage.getItem('user');
    if (user && user.token) {
        return true;
    }
    return false;
}