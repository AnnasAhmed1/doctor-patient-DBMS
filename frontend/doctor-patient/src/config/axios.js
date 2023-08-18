import axios from "axios";

// Create a custom Axios instance with default configuration
const instance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API's base URL
  // You can also add headers or other configurations here
});

export default instance;
