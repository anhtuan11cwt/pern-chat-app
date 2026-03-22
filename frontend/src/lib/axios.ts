import axios from "axios";

// Development: gọi sang port 3000
// Production: comment block này, dùng block bên dưới
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Gửi cookie cùng mọi request
});

// Production:
// const API = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

export default API;
