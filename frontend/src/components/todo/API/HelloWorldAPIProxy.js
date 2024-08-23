import axios from 'axios';

export default class HelloWorldAPIProxy {

    API_URL = 'http://localhost:8080';
    getHelloWorld() {
        console.log("HelloWorldAPIProxy.getHelloWorld()");
        console.log("API_URL: " + this.API_URL + "/hello-world");
        return axios.get(`${this.API_URL}/hello-world`);
    }

    getHelloWorldBean() {
        return axios.get(`${this.API_URL}/hello-world-bean`);
    }

    getHelloWorldBeanPathVariable(name) {
        return axios.get(`${this.API_URL}/hello-world-bean/path-variable/${name}`);
    }
}