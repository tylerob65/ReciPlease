import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import primaryTheme from "./themes/primaryTheme"
import UserContextProvider from './context/UserContext';
import MessageContextProvider from './context/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={primaryTheme}>
        <MessageContextProvider>
      <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </UserContextProvider>
        </MessageContextProvider>
    </ThemeProvider>
  // </React.StrictMode>
);