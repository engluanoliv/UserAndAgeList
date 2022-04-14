import React, { useState } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css"

const AddUser = (props) => {

    const [enteredUsername, setenteredUsername] = useState('');
    const [enteredAge, setenteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0).'
            });
            setenteredAge('');
            setenteredUsername('');
            return;
        }

        props.onAddUser(enteredUsername, enteredAge);
        setenteredAge('');
        setenteredUsername('');
    };

    const usernameChangeHandler = (e) => {
        setenteredUsername(e.target.value);
    };

    const ageChangeHandler = (e) => {
        setenteredAge(e.target.value);
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error &&
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onUnderstood={errorHandler}
                />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username" >UserName</label>
                    <input
                        type="text"
                        id="username"
                        value={enteredUsername}
                        onChange={usernameChangeHandler} />
                    <label htmlFor="age" >Age (Years)</label>
                    <input
                        type="number"
                        id="age"
                        value={enteredAge}
                        onChange={ageChangeHandler} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};


export default AddUser;