import React, {useState} from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import {authService} from "../firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)
  const onSocialClick = async (event) => {
    const {target: {name}} = event;
    let data;
    try {
      if (name === "google") {
        const provider = new GoogleAuthProvider();
        data = await signInWithPopup(authService, provider);
      } else if (name === "github") {
        const provider = new GithubAuthProvider();
        data = await signInWithPopup(authService, provider)
      }
      console.log(data)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return <div>
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange}/>
      <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange}/>
      <input type="submit" value={newAccount ? "계정 생성" : "로그인"} onClick={onSubmit}/>
      {errorMessage}
    </form>
    <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span>
    <div>
      <button onClick={onSocialClick} name="google">Google 로그인</button>
      <button onClick={onSocialClick} name="github">GitHub 로그인</button>
    </div>
  </div>
}


export default Auth
