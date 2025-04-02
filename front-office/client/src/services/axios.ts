import axios from "axios";
import { apiUrl } from "./api";

const Axios = axios.create({
    baseURL: apiUrl,
  });
  
  export default Axios;
  