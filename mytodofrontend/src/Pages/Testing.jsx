import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";






const Testing=()=>{

    const {updateToken}=useContext(AuthContext)
    useEffect(()=>{
        updateToken();
    },[])
    return(

        <div></div>
    )
}


export default Testing;