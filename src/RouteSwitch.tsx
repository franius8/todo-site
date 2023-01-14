import React from "react";
import { Routes, Route, HashRouter} from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";
import Login from "./AuthandAccountCompononents/Login";
import Register from "./AuthandAccountCompononents/Register";
import NoMatch from "./NoMatch";
import Account from "./AuthandAccountCompononents/Account";
import ForgotPassword from "./ForgotPassword";
import Reauthenticate from "./AuthandAccountCompononents/Reauthenticate";
import ChangePassword from "./AuthandAccountCompononents/ChangePassword";


// Main and only route switch for the app
export default function RouteSwitch() {

  return (
            <HashRouter>
              <Routes>
                  <Route path="/" element={<Home key={0} />} />
                  <Route path="/home" element={<Home key={0} />} />
                  <Route path="/done" element={<Done />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reauthenticate" element={<Reauthenticate />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
            </HashRouter>
  );
}