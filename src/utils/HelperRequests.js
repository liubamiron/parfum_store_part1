import axios from "axios";


// const prefix = process.env.NODE_ENV === "development" ? "http://0.0.0.0:8000/api/helper/" : "/api/helper/";
const prefix = process.env.NODE_ENV === "development" ? "https://giterbackend.azurewebsites.net/api/helper/" : "/api/helper/";

const basePath = `${prefix}`


// GET recive possible countries
export function getCountries(){
    const countries = axios.get(`${basePath}countries`)
        .then(response => response)
    return countries;
};