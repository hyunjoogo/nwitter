import AppRouter from "./Router";
import {useEffect, useState} from "react";
import {authService} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user= authService.currentUser
    setUserObj({...user});
  }

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> : "초기화중..."}
      <footer>
        &copy; Nwitter{new Date().getFullYear()}
      </footer>
    </>
  )

}

export default App;
