import axios from "axios";
import { decodedAccess,AccessToken } from "../decodedToken";
import axiosInstance  from ".";



const API_BASE_URL="http://localhost:8000/auth/api";




export const getAllTodos=async(payload)=>{
        try{
                const response=await axios.get(`${API_BASE_URL}/todos/${payload}`,
                {headers:{
                    'Content-Type':'application/json',
                    "Authorization": `Bearer ${AccessToken()}`,
                }});
                return response;
                
            }
        catch(err){
            return  err;
        }
}


export const DeleteTodo=async(payload)=>{
    try{
            const response=await axiosInstance.delete(`${API_BASE_URL}/todos/delete/${payload}`);
            return response;
    }
    catch(err){return err}
}



export const AddTodo=async(payload)=>{
    try{
        const response=await axiosInstance.post(`${API_BASE_URL}/todos/${payload.user}/`,payload);
        return response
    }
    catch(err) {return err};
}


export const UpdateTodo=async(payload)=>{
    try{
        const response=await axiosInstance.put(`${API_BASE_URL}/todos/update/${payload.task_id}/`,payload);
        return response
    }
    catch(err){return err}
}