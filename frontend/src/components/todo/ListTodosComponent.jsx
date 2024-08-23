import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TodoAPIService from "./API/TodoAPIService";
import {useAuth} from "./security/AuthorizationContext";
import {TodoRow} from "./TodoRow";

const ListTodosComponent = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const authContext = useAuth();
    const [username, setUsername] = useState(authContext.username);
    const [modal, setModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState({});


    function deleteTodo(todo) {
        const api = new TodoAPIService();
        api.deleteTodoById(username, todo.id, true)
            .then((response) => {
                setTodos(response.data);
            }).catch(e => console.error(e));
    }


    useEffect(() => {
        const api = new TodoAPIService();
        api.getTodosByUsername(username)
            .then(response => {
                setTodos(response.data);
            }).catch(e => console.error(e));
    }, [username]);

    return (
        <div className={"container"}>
            <div>
                <div>
                    <h1>Todos</h1>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        right: "17%",
                        top: "17%"
                    }}>
                        {
                            modal
                                ? <div>
                            <span
                                className={"m-2"}
                            >Delete Todo: {selectedTodo.description}?</span>


                                    <button className={"btn btn-danger"} onClick={() => {
                                        deleteTodo(selectedTodo);
                                        setModal(false);
                                    }
                                    }>Yes
                                    </button>
                                    <button className={"btn btn-warning"} onClick={() => {
                                        setModal(false)
                                    }}>No
                                    </button>
                                </div>
                                : null
                        }
                    </div>

                </div>
            </div>

            <table className={"table"}
                style={{tableLayout: "auto"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Done</th>
                    <th>Target Date</th>
                    <th></th>{/*Delete button*/}
                </tr>
                </thead>
                <tbody>
                {
                    todos.length > 0 ?
                    todos.map(
                        (todo, index) => {
                            return (
                                <TodoRow
                                    todo={todo}
                                    key={todo.id}
                                    selected={todo}
                                    setSelected={setSelectedTodo}
                                    setModal={setModal}
                                />
                            )
                        }
                    )
                    : <tr><td colSpan={5}>No Todos</td></tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListTodosComponent;