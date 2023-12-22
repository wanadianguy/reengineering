require('dotenv').config()
let url;
console.log("env:",process.env)
console.log("REQUEST_API_URL:",process.env.REQUEST_API_URL)
if(process.env.REQUEST_API_URL){
    url= process.env.REQUEST_API_URL;
}else {
    url = 'http://localhost:8080';
}
export const baseApiUrl = url;
