import axios from "axios";

export default class TodoAPIService {

    #API_URL = 'http://localhost:8080';
    #apiClient;

    constructor() {
        this.#apiClient = axios.create({
            baseURL: this.#API_URL,
        });
    }

    getAllTodos() {
        return this.#apiClient.get("/todos");
    }

    getTodosByUsername(username) {
        return this.#apiClient.get(`/users/${username}/todos`);
    }

    getTodosByUsernameAndID(username, id) {
        return this.#apiClient.get(`/users/${username}/todos/${id}`);
    }

    postNewTodoItem(username, todo) {
        return this.#apiClient.post(`users/${username}/todos/`, todo);
    }

    deleteTodoById(username, id, returnListOfTodos) {
        return this.#apiClient.delete(`/users/${username}/todos/${id}`, {params: {returnListOfTodos}});
    }

    toggleTodoCompletion(username, id) {
        return this.#apiClient.patch(`/users/${username}/todos/${id}`);
    }
}