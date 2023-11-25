import axios from "axios";
import { RefreshToken } from "../decodedToken";


const API_BASE_URL="http://localhost:8000/auth/api"

export const UpdateToken=async ()=>{
    try{ 
            const refresh=JSON.stringify({refresh:RefreshToken()})
            const headers={headers:{
                'Content-Type':'application/json'
            }}
            const response=await axios.post(`${API_BASE_URL}/token/refresh/`,refresh,headers);
            return response;
        }

        catch(err){
            return err;
        }
    }
   





export const getToken = (payload) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios.post(`${API_BASE_URL}/token/`, payload, headers)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err
        });
};



