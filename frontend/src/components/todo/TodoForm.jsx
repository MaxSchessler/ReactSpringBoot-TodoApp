import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthorizationContext";
import {useParams} from "react-router-dom";
import TodoAPIService from "./API/TodoAPIService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import moment from "moment";
const TodoForm = () => {

    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const {id} = useParams();

    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const api = new TodoAPIService();
        api.getTodosByUsernameAndID(username, id).then(response => {
            setDescription(response.data.description);
            setTargetDate(response.data.targetDate);
            setIsDone(response.data.done);

        }).catch(error => {
            console.log(error);
            setErrorMessage(error.message);
        })
    }, []);

    function onFormSubmit(values) {

    }

    function updateTodo() {
        const api = new TodoAPIService();

    }

    function validateForm(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "Enter a description";
        } else if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters in the description";
        }

        if (!values.targetDate) {
            errors.targetDate = "Enter a target date";
        } else if (values.targetDate.length < 10) {
            errors.targetDate = "Enter a valid target date";
        }

        return errors;
    }


    return (
        <div>
            <div className="container">
                <h1>Edit Todo</h1>
                <div className={"container"}>
                    <Formik
                        initialValues={{description, targetDate}}
                        nableReinitialize={true}
                        onSubmit={onFormSubmit}
                        validate={validateForm}>
                        validateOnBlur={false}
                        validateOnChange={false}>
                        {
                            (props) => {
                                return(
                                    <Form style={{
                                          width: "45%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            gap: "15px"
                                        }} >
                                        <ErrorMessage name={"description"} component={"div"} className={"alert alert-warning"}/>
                                        <fieldset className={"form-group"}>
                                            <label>Description</label>
                                            <Field type={"text"}
                                                   className={"form-control"}
                                                   name={"description"}
                                                   value={description}
                                                   onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </fieldset>
                                        <ErrorMessage name={"Target Date"} component={"div"} className={"alert alert-warning"}/>
                                        <fieldset className={"form-group"}>
                                            <label>Target Date</label>
                                            <Field
                                                type={"date"}
                                                className={"form-control"}
                                                name={"targetDate"}
                                                value={moment(targetDate).format("YYYY-MM-DD")}
                                                onChange={(e) => setTargetDate(e.target.value)}
                                            />
                                        </fieldset>
                                        <div id={"save-button-container"} style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            paddingRight: "10px",
                                            paddingTop: "20px",
                                            paddingBottom: "10px"
                                        }}>
                                            <button className={"btn btn-success"} type={"submit"}>Save</button>
                                        </div>
                                    </Form>
                                );
                            }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default TodoForm;