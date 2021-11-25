import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/*" element={<Home userObj={userObj}/>}/>
            <Route path="/profile/*" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
            <Route path="*" element={<Navigate replace to="/"/>}/>
          </>
          : <>
            <Route path="/*" element={<Auth/>}/>
            <Route path="*" element={<Navigate replace to="/"/>}/>
          </>
        }
      </Routes>
    </Router>
  )
}

export default AppRouter
