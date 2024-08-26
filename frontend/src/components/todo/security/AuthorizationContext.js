import {createContext, useContext, useState} from "react";
import AuthAPIService from "../API/AuthAPIService";
export const authorizationContext = createContext();

export const useAuth = () => useContext(authorizationContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    async function login(username, password) {

        try {
            const authAPI = new AuthAPIService();
            const token = "Basic " + window.btoa(username + ":" + password);
            const response = await authAPI.basicAuthService(token);
            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(token);
                return true;
            } else {
                setAuthenticated(false);
                setUsername(null)
                setToken(null);
                return false;
            }
        } catch (error) {
            console.error("Error in Login: " + error);
            setAuthenticated(false);
            setUsername(null);
            setToken(null);
            return false;
        }

    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <authorizationContext.Provider value={{ isAuthenticated, setAuthenticated, username, login, logout, token }}>
            {children}
        </authorizationContext.Provider>
    );
}
