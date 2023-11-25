import jwt_decode from "jwt-decode";



export const decodedAccess=()=>{
    let token=JSON.parse(localStorage.getItem("authToken"));
    return token ? jwt_decode(token.access) : false}

export const AccessToken=()=>{
    let token=JSON.parse(localStorage.getItem("authToken"));
    return token ? token.access : false}

export const RefreshToken=()=>{
    let token=JSON.parse(localStorage.getItem("authToken"));
    return token ? token.refresh : false}