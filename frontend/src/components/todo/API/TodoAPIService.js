import axios from "axios";

export default class TodoAPIService {

    #API_URL = 'http://localhost:8080';
    #apiClient;
    #token;

    constructor(token) {
        this.#token = token;
        this.#apiClient = axios.create({
            baseURL: this.#API_URL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.#token,
            }
        });
    }

    getTodosByUsername(username, todoStatus="ALL") {
        return this.#apiClient.get(`/users/${username}/todos`, {
            params: {todoStatus},
            headers: {
                Authorization: "Basic dXNlcjpwYXNzd29yZA=="
            }
        });
    }

    getTodosByUsernameAndID(username, id) {
        return this.#apiClient.get(`/users/${username}/todos/${id}`);
    }

    postNewTodoItem(username, todo) {
        return this.#apiClient.post(`/users/${username}/todos`, todo);
    }

    deleteTodoById(username, id, returnListOfTodos) {
        return this.#apiClient.delete(`/users/${username}/todos/${id}`, {
            params: {returnListOfExisting: returnListOfTodos},
        });
    }

    toggleTodoCompletion(username, id) {
        return this.#apiClient.patch(`users/${username}/todos/${id}/toggle`);
    }

    updateTodoItem(username, id, todo) {
        return this.#apiClient.put(`users/${username}/todos/${id}`, todo);
    }
}