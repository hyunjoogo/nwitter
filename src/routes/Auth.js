import React, {useState} from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import {authService} from "../firebase";
import AuthForm from "../components/AuthForm";

const Auth = () => {

  const onSocialClick = async (event) => {
    const {target: {name}} = event;
    let provider ;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider).catch(alert);
  }

  return <div>
    <AuthForm/>
    <div>
      <button onClick={onSocialClick} name="google">Google 로그인</button>
      <button onClick={onSocialClick} name="github">GitHub 로그인</button>
    </div>
  </div>
}


export default Auth
