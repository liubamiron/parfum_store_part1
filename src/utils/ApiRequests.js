import axios from "axios";


// const prefix = process.env.NODE_ENV === "development" ? "http://0.0.0.0:8000/api/" : "/api/";
const prefix = process.env.NODE_ENV === "development" ? "https://giterbackend.azurewebsites.net/api/" : "/api/";


const basePath = `${prefix}`


// GET recive possible countries
export function calcNewInsurance(data){
    // console.log("hey i'm here");

    let newConf = {
        url: `${basePath}calculate`,
        method: 'post',
        data: data,
    }

    const insurances = axios(newConf)
        .then(response => response)
    return insurances;
};