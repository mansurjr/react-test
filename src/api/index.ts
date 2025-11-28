import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/public",
  
})


export default baseApi