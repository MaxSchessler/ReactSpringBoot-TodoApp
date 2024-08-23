import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import TodoAPIService from "./API/TodoAPIService";

export const TodoRow = ({todo, selected, setSelected, setModal}) => {
    const [todoState, setTodoState] = useState(todo);
    const navigate = useNavigate();
    const targetDate = moment(todo.targetDate).format("ddd, MMM, Do, YYYY");

    function updateTodo(todo) {
        const api = new TodoAPIService();
        api.toggleTodoCompletion(todo.username, todo.id)
            .then(response => {
                setTodoState(response.data);
            })
            .catch(error => console.log(error));

        return null;
    }

    return (
        <tr>
            <td>{todoState.id}</td>
            <td>{todoState.description}</td>
            <td><div>
                <input type={"checkbox"} checked={todoState.done} onChange={() => {
                    updateTodo(todoState);
                }}/>
            </div></td>
            <td>{targetDate}</td>
            <td>
                <button
                    style={{border: "none", background: "none"}}
                    onClick={() => {
                        setModal(true);
                        setSelected(selected);
                        console.log(selected);
                    }}><FontAwesomeIcon icon={faTrash}/></button>
                <button
                    style={{border: "none", background: "none"}}
                    onClick={() => {
                        navigate("/todos/" + todoState.id);
                    }}><FontAwesomeIcon icon={faPenToSquare}/></button>

            </td>
        </tr>
    )
}