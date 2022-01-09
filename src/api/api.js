import { decode } from 'js-base64';

const url = 'http://localhost:5164/api';

const userTokenName = 'USER_TOKEN';

const setUserToken = (token) => {
    localStorage.setItem(userTokenName, token);
}

const getUserToken = () => {
    return localStorage.getItem(userTokenName);
}

const createResponse = (status, data) => {
    return {
        status,
        data
    }
}

const getUsers = async () => {

    const token = getUserToken();

    let response = await fetch(`${url}/user/`, {
        method: 'GET',
        headers: { "Accept": "application/json", "Content-Type": "application/json", "jwt": token}
    })
    if (response.ok) {
        let json = await response.json();
        return createResponse(response.status, json);
    } else {
        return createResponse(response.status);
    }
}

const authorize = async (email, password) => {
    let response = await fetch(`${url}/authorize/`, {
        method: 'POST',
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify( {
            email,
            password
        })
    })

    if (response.ok) {
        let token = await response.text();
        setUserToken(token);
        return createResponse(response.status, getCurrentUserData());
    }

    return createResponse(response.status);
}

const isAuthorize = () => {
    const token = getUserToken();
    return !!token;
}

const getCurrentUserData = () => {
    const token = getUserToken();
    const [header, payload] = token.split('.');
    if (payload) {
        const dataStr = decode(payload);
        return JSON.parse(dataStr)
    }
    return {};
}

const logout = () => {
    setUserToken('');
}

export default {
    getUsers,
    authorize,
    isAuthorize,
    getCurrentUserData,
    logout
}


