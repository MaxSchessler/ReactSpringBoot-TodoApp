import {createContext, useContext, useState} from "react";

export const authorizationContext = createContext();

export const useAuth = () => useContext(authorizationContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    function login(username, password) {
        if (username === "maxschessler" && password === "password") {
            setAuthenticated(true);
            setUsername(username)
            return true;
        } else {
            setAuthenticated(false);
            setUsername(null)
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <authorizationContext.Provider value={{ isAuthenticated, setAuthenticated, username, login, logout }}>
            {children}
        </authorizationContext.Provider>
    );
}
