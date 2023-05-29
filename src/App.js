import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import Navbar from './components/Navbar';
import {useUser} from "./context/UserContext";
import Logout from './views/Logout';
import Message from './components/Message';
import { useMessage } from './context/MessageContext';
import { Container, Stack } from '@mui/material';
import ViewRecipe from './views/ViewRecipe';
import ViewRecipeDemo from './views/ViewRecipeDemo';
import AddRecipe from './views/AddRecipe';
import ModifyRecipe from './views/ModifyRecipe';
import MyProfile from './views/MyProfile';
import RandomRecipe from './views/RandomRecipe';


export default function App() {

  const { user, setUser } = useUser()
  const { messages, setMessages, addMessage } = useMessage()

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

  const showMessages = () => {
    console.log("Printing messages")
    console.log(messages)
    return (

      <Container maxWidth="sm">
        {/* // <Container display="flex" flexDirection="column" justifyContent="center" sx={{maxWidth:"600px"}}> */}
      {/* <Stack maxWidth="sm" */}
      {/* alignItems="center" */}
      
          {/* <Stack maxWidth="sm" sx={{ maxWidth: "sm" }} > */}
        {messages.map(({text, severity},index) => {
          return(
          <Message
          key={index}
          text={text}
          severity={severity}
          index={index}
          />)
        })}
      {/* </Stack> */}
      </Container>
      
    )
  }

  // addMessage("here is a message","here is another message")

  return (
    <>
      <Navbar logMeOut={logMeOut}/>
      
      {showMessages()}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/viewrecipedemo' element={<ViewRecipeDemo />} />
        <Route path='/viewrandomrecipedemo' element={<ViewRecipeDemo />} />
        <Route path='/viewrecipe/:recipeID' element={<ViewRecipe />} />
        <Route path='/viewrandomrecipe' element={<RandomRecipe />} />
        <Route path='/addrecipe' element={<AddRecipe />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/modifyrecipe/:recipeID' element={<ModifyRecipe />} />
        <Route path='/signup' element={<SignUpPage logMeIn={logMeIn}/>} />
        <Route path='/login' element={<LoginPage logMeIn={logMeIn} user={user}/>} />
        <Route path='/logout' element={<Logout logMeOut={logMeOut}/>} />
      </Routes>
    </>
  );
}
