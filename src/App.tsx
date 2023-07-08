import { FC } from "react";
import LogInAndRegister from "./Component/Register/LogInAndRegister";
import UserProvider from "./Component/Providers/UserProvider";
// import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Chat from "./Component/pages/Chat";

type P = {};

const App: FC<P> = () => {
  // axios.defaults.baseURL = `http://localhost:1000`;
  // axios.defaults.withCredentials = true;

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={<LogInAndRegister formType={"Register Now"} />}
          />
          <Route
            path="/LogIn"
            element={<LogInAndRegister formType={"Log In"} />}
          />
           <Route
            path="/Chat"
            element={<Chat/>}
          />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
