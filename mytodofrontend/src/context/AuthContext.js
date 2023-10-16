import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider=({children})=>{

        

        let [user,setUser]=useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')): null)
        let [authToken,setAuthToken]=useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')): null)
        let [loading,setLoading]=useState(true);


        const navigate=useNavigate();


        let loginUser=async(e)=>{
            e.preventDefault()
            
            
            ////Your own endpoind will be below
            try{
                let response=await fetch('http://localhost:8000/auth/api/token/',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({"username":e.target.Username.value, "password":e.target.Password.value})
                })

                let data= await response.json();
                if(response.status===200){
                    setAuthToken(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authToken', JSON.stringify(data))
                    navigate('/')
                }
                else{
                    console.log(data)
                    alert(data.detail+"\n Use Correct Credentials") // use status and show the error in customized way
                }
                
            }

            catch(error) {
                alert(error+": Backend not connected")
          }

        }

       



        // currently not in used but can be used!!!
        let LogoutUser=()=>{
            setAuthToken(null)
            setUser(null)
            localStorage.removeItem('authToken')
            navigate('/login')
        }

        let UpdateToken = async(e)=>{
            console.log("Updated")
            // e.preventDefault()
            //Your own endpoind will be below
            let response=await fetch('http://localhost:8000/auth/api/token/refresh/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"refresh":authToken.refresh})
            })

            let data= await response.json();

            if (response.status===200){
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authToken', JSON.stringify(data))
            }else{
                LogoutUser();
            }

        }

        let ContextData={
            user:user,
            LoginUser:loginUser,
            UpdateToken:UpdateToken,
            Logout:LogoutUser
        }

        // You need custom JWT token from simple_jwt in order to work this properly.
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

