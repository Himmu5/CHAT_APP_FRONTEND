import axios from "axios";

export const createUser = (user: { username: string; password: string }) => {
  return axios.post("/register", user ).then((res) => {
    return res.data;
  });
};

export const logInUser = (user: { username: string; password: string }) =>{
  return axios.post('/signin' , user ).then((res)=>{
    return res.data;
  })
}
