import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import HelloWorldAPIProxy from "./API/HelloWorldAPIProxy";
import {useAuth} from "./security/AuthorizationContext";

const WelcomeComponent = () => {

    const authContext = useAuth();

    return (
        <div className={"container"}>
            <h1 className={"welcome-header"}>Welcome!</h1>
            {
                authContext.isAuthenticated
                    ? <h1>Authenticated</h1>
                    : <h1>Not Authenticated</h1>
            }
        </div>
    );
}
export default WelcomeComponent;