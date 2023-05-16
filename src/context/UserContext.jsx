import { createContext, useContext, useState } from "react";
export const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext)
}

const getUserFromLocalStorage = () => {
    const found = localStorage.getItem("ReciPlease_user")
    if (found) {
        return JSON.parse(found)
    }
    return {}
}

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage)

    const myValue = {
        user: user,
        setUser: setUser,
    }
    return (
        <UserContext.Provider value={myValue}>
            {children}
        </UserContext.Provider>
    )
};


export default UserContextProvider;
