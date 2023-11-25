import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastError,ToastInfo } from "../utils/Toasts";
import { UpdateToken, getToken } from "../Api/LoginApi";
import { decodedAccess } from "../decodedToken";


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider=({children})=>{

        

        let [user,setUser]=useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')): null)
        let [authToken,setAuthToken]=useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')): null)
        let [loading,setLoading]=useState(true);


        const navigate=useNavigate();


        let loginUser=async(e)=>{
            e.preventDefault();
            try{
                let payload={"username":e.target.Username.value, "password":e.target.Password.value}
                const response=await getToken(payload);
                if(response.status===200){
                    localStorage.setItem('authToken', JSON.stringify(response.data))
                    setAuthToken(response.data)
                    setUser(jwt_decode(response.data.access))
                    navigate('/');
                }
                else if(response.response.status===401){
                    ToastError("Invalid Username/Password")
                }
            }
            catch(error) {
                console.log(error)
          }

        }

       



        let LogoutUser=()=>{
            
            setAuthToken(null)
            setUser(null)
            localStorage.removeItem('authToken')
            navigate('/login')
        }

        const updateToken = async()=>{
            // e.preventDefault();
            try{
                const response=await UpdateToken();
                if (response.status===200){
                    setAuthToken(response.data.access)
                    setUser(jwt_decode(response.data.access))
                    localStorage.setItem('authToken', JSON.stringify(response.data.access))
                }
                
                else if(response.status===401 || response.response.status===401){ LogoutUser(); ToastError("login Again");}

            }
            catch(err){
                    console.log(err)
            }

            
            
            

        }

        let ContextData={
            user:user,
            LoginUser:loginUser,
            updateToken:updateToken,
            Logout:LogoutUser
        }

        
        // need to set the access_token time
        // need to set the refresh_token time
        // need to blacklist the old token
        //read simple_jwt token's documentation to understand the purpose of the following code
        // useEffect(()=>{
        //    let  interval=setInterval(()=>{
        //         if(authToken){
        //             UpdateToken();
        //         }
        //     },150000) // after 15 minutes the token will update (if token is customized token)
        //     return ()=>clearInterval(interval)
        // },[authToken, loading])
    
    return(
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    )
}

