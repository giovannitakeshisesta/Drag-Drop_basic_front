import axios from "axios";

const createHttp = () => {
  const http = axios.create({
    // baseURL: "http://localhost:3002/api",
    baseURL: `https://draganddrop-giovanni.onrender.com/api`
  });

  return http;
};

export default createHttp;
