import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useUser } from "./context/UserContext";
import { useMessage } from './context/MessageContext';
import AddRecipe from './views/AddRecipe';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import Logout from './views/Logout';
import ModifyRecipe from './views/ModifyRecipe';
import MyProfile from './views/MyProfile';
import Profile from './views/Profile';
import RandomRecipe from './views/RandomRecipe';
import SearchByIngredients from './views/SearchByIngredients';
import SignUpPage from './views/SignUpPage';
import ViewRecipe from './views/ViewRecipe';
import ViewRecipeDemo from './views/ViewRecipeDemo';
import ViewSearchedRecipe from './views/ViewSearchedRecipe';
import Navbar from './components/Navbar';
import Message from './components/Message';
import Container from '@mui/material/Container';

export default function App() {

  const { user, setUser } = useUser()
  const { messages, setMessages, addMessage } = useMessage()

  const logMeIn = (user, rememberMe) => {
    setUser(user)
    console.log("LoggingIn", user)
    if (rememberMe) {
      localStorage.setItem("ReciPlease_user", JSON.stringify(user))
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
        {messages.map(({ text, severity }, index) => {
          return (
            <Message
              key={index}
              text={text}
              severity={severity}
              index={index}
            />)
        })}
      </Container>

    )
  }

  return (
    <>
      <Navbar logMeOut={logMeOut} />

      {showMessages()}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/viewrecipedemo' element={<ViewRecipeDemo />} />
        <Route path='/viewrandomrecipedemo' element={<ViewRecipeDemo />} />
        <Route path='/viewrecipe/:recipeID' element={<ViewRecipe />} />
        <Route path='/viewrandomrecipe' element={<RandomRecipe />} />
        <Route path='/viewsearchedrecipe/:spoonacularID' element={<ViewSearchedRecipe />} />
        <Route path='/searchbyingredients' element={<SearchByIngredients />} />
        <Route path='/addrecipe' element={<AddRecipe />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/modifyrecipe/:recipeID' element={<ModifyRecipe />} />
        <Route path='/signup' element={<SignUpPage logMeIn={logMeIn} />} />
        <Route path='/login' element={<LoginPage logMeIn={logMeIn} user={user} />} />
        <Route path='/logout' element={<Logout logMeOut={logMeOut} />} />
      </Routes>
    </>
  );
}
