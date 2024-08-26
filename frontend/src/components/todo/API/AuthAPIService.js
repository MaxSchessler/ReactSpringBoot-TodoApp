import axios from "axios";

export default class AuthAPIService{
    #API_URL = 'http://localhost:8080';
    #apiClient;

    constructor () {
        this.#apiClient = axios.create({
            baseURL: this.#API_URL,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    basicAuthService(token) {
        return this.#apiClient.get('/basicauth', {
            headers: {
                authorization: token
            }
        });

    }
}