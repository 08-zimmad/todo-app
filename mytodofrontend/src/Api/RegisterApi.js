import axios from 'axios';


const API_BASE_URL="http://localhost:8000/auth/api"


export const RegisterUserAxios = async (payload)=>{
    try{
        const response=await axios.post(
            `${API_BASE_URL}/register/`,
            payload
        );
        return response.data;
    }
    catch(error){
        return (error)
    }
}