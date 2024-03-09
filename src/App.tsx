import { FC } from "react";
import LogInAndRegister from "./Component/Register/LogInAndRegister";
import UserProvider from "./Component/Providers/UserProvider";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Chat from "./Component/pages/Chat";
import AuthRoute from "./Component/Routes/AuthRoute";
import UserRoute from "./Component/Routes/UserRoute";
import ChatProvider from "./Component/Providers/ChatProvider";

type P = object

const App: FC<P> = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
  axios.defaults.withCredentials = true;

  return (
    <div>
      <UserProvider>
        <ChatProvider>
          <Routes>
            <Route
              path="/register"
              element={<AuthRoute><LogInAndRegister formType={"Register Now"} /></AuthRoute>}
            />
            <Route
              path="/"
              element={<AuthRoute><LogInAndRegister formType={"Log In"} /></AuthRoute>}
            />
            <Route
              path="/Chat"
              element={<UserRoute><Chat /></UserRoute>}
            />
          </Routes>
        </ChatProvider>
      </UserProvider>
    </div>
  );
};

export default App;
