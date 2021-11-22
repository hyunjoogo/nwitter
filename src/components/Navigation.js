import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {authService} from "../firebase";

const Navigation = () => {
  const navigate = useNavigate();
  const onSignOut = () => {
    signOut(authService).then(() => navigate("/"))
  }
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
      </ul>
      <ul>
        <li>
          <button onClick={onSignOut} name="signOut">로그아웃</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
