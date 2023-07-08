import { FC, ReactNode, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { user } from "../models/user";
import axios from "axios";

type P = {
  children: ReactNode;
};

const UserProvider: FC<P> = ({ children }) => {

  
  const [user, setUser] = useState<user>();

  useEffect(()=>{
    axios.get('/profile').then((res)=>{
        setUser(res.data);
    })
  },[])


  function removeUser() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
