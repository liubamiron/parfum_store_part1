import axios from 'axios';

// const basePath = process.env.NODE_ENV === "development" ? "http://0.0.0.0:8000/api/" : "https://giterbackend.azurewebsites.net/api/";
const basePath = process.env.NODE_ENV === "development" ? "https://giterbackend.azurewebsites.net/api/" : "/api/helper/";

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// POST login
export function login(login, password) {
    const bodyFormData = new FormData();
    bodyFormData.append("username", login);
    bodyFormData.append("password", password);
    const response = axios.post(`${basePath}login/`, bodyFormData)
    .then(response => response.data)
    return response;
}


// GET get my data by id
export function getMeById() {
    var x = getCookie('Authorization')
    const response = axios.get(`${basePath}cabinet/me/`, {
        headers: { 
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true 
    })
    .then(response => response.data)
    return response;
}


// GET get my target data
export function getTarget() {
    var x = getCookie('Authorization')
    const response = axios.get(`${basePath}cabinet/my-target/`, {
        headers: { 
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true 
    })
    .then(response => response.data)
    return response;
}

// GET get my network
export function getNetwork() {
    var x = getCookie('Authorization')
    const response = axios.get(`${basePath}cabinet/my-network/`, {
        headers: { 
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true 
    })
    .then(response => response.data)
    return response;
}

//

export function getNetworkById(id) {
    var x = getCookie('Authorization')
    const response = axios.get(`https://giterbackend.azurewebsites.net/api/cabinet/my-network/` + id, {
        // const response = axios.get(`${basePath}cabinet/my-network/`, {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true
    })
        .then(response => response.data)
    return response;
}

//GET get my catalog
export function getCatalog() {
    console.log("basePath: ", basePath)
    let x = getCookie('Authorization')
    const response = axios.get(`${basePath}cabinet/catalog/`, {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true
    })
        .then(response => response.data)
    return response;
}

//GET get my shopping bag goods
export function getShoppingGoods() {
    let x = getCookie('Authorization')
    // console.log("token ", x);
    return axios.get(`${basePath}order/cart/`, {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true
    })
        .then(response => response.data)
        .catch(function (error) {
            console.log("Throw exception: ", error);
        });
}