import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthorizationContext";

const HeaderComponent = () => {
    const authContext = useAuth();

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">
                            in28minutes
                        </a>
                        <ul className="navbar-nav flex-row ">
                            {
                                authContext.isAuthenticated
                                    ? <li className="nav-item fs-5 mx-2"><Link className="nav-link" to={"/welcome"}>Home</Link></li>
                                    : null
                            }
                            {
                                authContext.isAuthenticated
                                    ? <li className="nav-item fs-5"><Link className="nav-link" to={"/todos"} onClick={() => {
                                        // if page we are on is todos then reload the page
                                        if (window.location.pathname === "/todos") {
                                            window.location.reload();
                                        }
                                    }}>Todos</Link></li>
                                    : null
                            }


                        </ul>
                        <ul className="navbar-nav d-flex flex-row ms-auto">
                            {
                                authContext.isAuthenticated
                                    ? <li className="nav-item fs-5">
                                        <Link className="nav-link" to="/" onClick={authContext.logout}>Logout</Link>
                                    </li>
                                    : <li className="nav-item fs-5">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
