import axios from "axios";
import {getCookie} from "./apiCalls";

// for local development
// const prefix = "http://0.0.0.0:8000/api/client/";


// const prefix = process.env.NODE_ENV === "development" ? "http://0.0.0.0:8000/api/" : `https://giterbackend.azurewebsites.net/api/`;
const prefix = process.env.NODE_ENV === "development" ? "https://giterbackend.azurewebsites.net/api/" : `https://giterbackend.azurewebsites.net/api/`;

const basePath = `${prefix}`


// GET if user is logged in response true
export function isAuthClient() {
    console.log(prefix);
    const response = axios.get(`${basePath}auth`, { withCredentials: true })
    .then(response => response)
    return response;
}

// POST add new my shiping point
export function addShippingPoint(data) {
    const response = axios.post(`${basePath}add-shipping-point`, data, { withCredentials: true })
    return response;
}

// GET get all my shiping points
export function getShippingPoint() {
    const response = axios.get(`${basePath}get-all-shipping-points`, { withCredentials: true })
    .then(response => response.data)
    return response;
}

// GET get all my shiping points
export function getPrises(data) {

    const response = axios.get(`${basePath}calculate-order`, {
        params: {
            cargo_type: data.cargoType,
            city_sender_id: data.citySenderId,
            city_recipient_id: data.cityRecipientId,
            city_sender_title: data.citySenderTitle,
            city_recipient_title: data.cityRecipientTitle,
            weight: data.weight,
            length: data.length,
            width: data.width,
            height: data.height,
            seatAmount: data.seatAmount,
            from_door: data.deliveryMethodFrom.fromDoor,
            from_office: data.deliveryMethodFrom.fromOffice,
            to_door: data.deliveryMethodTo.toDoor,
            to_office: data.deliveryMethodTo.toOffice, 
            to_postomat: data.deliveryMethodTo.toPostomat,
        }, withCredentials: true })
    .then(response => response.data)
    return response;
}

// POST create new delivery order
export function createNewDeliveryOrder(data) {
    const response = axios.post(`${basePath}create-new-order`, data, { withCredentials: true })
    .then(response => response.data)
    return response;
}


// GET get all my orders
export function getAllMyOrders() {
    var x = getCookie('Authorization')
    // const response = axios.get(`${basePath}orders`, { withCredentials: true })
    const response = axios.get(`${basePath}order/list/`, {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true
    })
    .then(response => response.data)
    return response;
}

// get order by id
export function getOrderById(id) {
    var x = getCookie('Authorization')
    const response = axios.get(`${basePath}order/` + id + '/', {
        headers: {
        'Access-Control-Allow-Credentials': true,
            'Authorization': x
        },
        // withCredentials: true
})
        .then(response => response.data)
    return response;
}

// GET get order by id
// export function getOrderById(orderId) {
//     const response = axios.get(`${basePath}order`, { params: {order_id: orderId}, withCredentials: true })
//     .then(response => response.data)
//     return response;
// }


// GET get all my delivery companies
export function getDeliveryCompanies() {
    const response = axios.get(`${basePath}get-all-delivery-companies`, { withCredentials: true })
    .then(response => response.data)
    return response;
}

// POST add my delivery companies
export function addDeliveryCompanies(data) {
    const response = axios.post(`${basePath}add-delivery-company`, data, { withCredentials: true })
    .then(response => response.data)
    return response;
}