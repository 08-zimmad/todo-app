import axios from "axios";
import { AccessToken } from "../decodedToken";



// const token=JSON.parse(localStorage.getItem("authToken"));

// const axiosInstance=axios.create({
  
//     'headers':{
//       "Authorization":  `Bearer ${token.access}`,
//       "Content-Type":"application/json"
//     }
// });


const token = JSON.parse(localStorage.getItem("authToken"));
let axiosInstance = null;

if (token) {
  axiosInstance = axios.create({
    headers: {
      "Authorization": `Bearer ${token.access}`,
      "Content-Type": "application/json"
    }
  });
}


export default axiosInstance;