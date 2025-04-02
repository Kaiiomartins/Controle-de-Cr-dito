import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:5258/ControllerSistema", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;