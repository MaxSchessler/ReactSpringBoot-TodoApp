
import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import "../../styles/TodoApp.css"
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponent";
import AuthProvider, {useAuth} from "./security/AuthorizationContext";
import TodoForm from "./TodoForm";


function AuthenticatedRoute({children}) {
    const auth = useAuth();
    if (auth.isAuthenticated) {
        return children;
    }

    return <Navigate to={"/login"}/>
}

const TodoApp = () => {

    return (
        <div className="todo-app">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path={"/login"} element={<LoginComponent/>}/>

                        <Route path={"/welcome"} element={<AuthenticatedRoute children={<WelcomeComponent/>}/>}/>
                        <Route path={"/todos"} element={<AuthenticatedRoute children={<ListTodosComponent/>}/>}/>
                        <Route path={"/todos/:id"} element={<AuthenticatedRoute children={<TodoForm/>}/>}/>

                        {/* Error comp accepts all other url paths */}
                        <Route path="/*" element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

const Error = () => {
    return(
        <div>
            <h1>404 Page is not found.</h1>
        </div>
    );
}

export default TodoApp;