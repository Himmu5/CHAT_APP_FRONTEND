import { FC, ReactNode, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { user } from "../models/user";
import axios from "axios";

type P = {
  children: ReactNode;
};

const UserProvider: FC<P> = ({ children }) => {


  const [user, setUser] = useState<user>();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('/profile' , { headers : { Authorization : token } }).then((res) => {
        setUser(res.data.user);
      })
    }
  }, [])


  function removeUser() {
    setUser(undefined);
    localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
