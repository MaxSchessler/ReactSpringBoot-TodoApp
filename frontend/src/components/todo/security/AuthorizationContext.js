import {createContext, useContext, useState} from "react";
import AuthAPIService from "../API/AuthAPIService";
import TodoAPIService from "../API/TodoAPIService";
export const authorizationContext = createContext();

export const useAuth = () => useContext(authorizationContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);


    async function login(username, password) {
        try {
            // create token string from AuthAPIServices: Makes request to authenticate api endpoint with {username, password}
            // returns the jwt token
            const jwtResponse = await AuthAPIService.jwtAuthService(username, password);
            if (jwtResponse.status === 200) { // if response is successful
                // set authenticated to true, set username, and setup axios interceptors to use jwt in every request
                setAuthenticated(true);
                setUsername(username);
                let jwt = `Bearer ${jwtResponse.data.token}`;
                console.log(jwt);
                TodoAPIService.setupAxiosInterceptors(jwt); // added token to header of each request
                return true;

            } else {
                // if response is not successful, set authenticated to false, set username to null, and return false
                logout();
                console.log("Login failed");
                return false;
            }
        } catch (error) {
            // if error occurs, log error, set authenticated to false, set username to null, and return
            console.error("Error in Login: " + error);
            logout();
            return false;
        }

    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
    }

    return (
        <authorizationContext.Provider value={{ isAuthenticated, setAuthenticated, username, login, logout }}>
            {children}
        </authorizationContext.Provider>
    );
}
