import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import Navbar from './components/Navbar';
import {useUser} from "./context/UserContext";
import Logout from './views/Logout';



export default function App() {

  const { user, setUser } = useUser()

  const logMeIn = (user, rememberMe) => {
    setUser(user)
    console.log("LoggingIn",user)
    if (rememberMe) {
      localStorage.setItem("ReciPlease_user",JSON.stringify(user))
      console.log("Wanted to remember")
    }
  }

  const logMeOut = () => {
    setUser({})
    localStorage.removeItem("ReciPlease_user")
    console.log("LoggedOut")
  }

  return (
    <>
      <Navbar logMeOut={logMeOut}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage logMeIn={logMeIn} user={user}/>} />
        <Route path='/logout' element={<Logout logMeOut={logMeOut}/>} />
      </Routes>
    </>
  );
}
