import axios from "axios"

export const sendQuery = (query : string)=>{
    return axios.post("chat" , { query } ).then((res)=>{
        return res.data;
    })
}