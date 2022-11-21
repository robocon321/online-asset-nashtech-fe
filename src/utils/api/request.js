import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const request = axios.create({
  baseURL: API_URL,
  // baseURL: "http://localhost:8080",

});

export default request;
