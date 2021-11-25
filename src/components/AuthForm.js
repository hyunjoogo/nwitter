import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {authService} from "../firebase";
import {useState} from "react";

const AuthForm = (props) => {
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
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount ? "계정 생성" : "로그인"} onClick={onSubmit}/>
        {errorMessage}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span>
    </>
  )
}
export default AuthForm
