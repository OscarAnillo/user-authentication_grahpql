import { useContext, useState } from "react";
import { AuthContext } from "../Context/auth-context";
import { useForm } from "../Utility/Hooks";
import { REGISTER_USER } from '../Queries/queries'
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {TextField, Button, Container, Stack, Alert} from '@mui/material'


export const Register = () => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUserCallback = () => {
        console.log("Callback hit")
        registerUser();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password:"",
        confirmPassword:""
    })
    console.log(values)

    const [registerUser, result] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate("/")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>This is the register page, register below to create an account!</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField label="Username" name="username" onChange={onChange} />
                <TextField label="Email" name="email" onChange={onChange} />
                <TextField label="Password" name="password" onChange={onChange} />
                <TextField label="Confirm Password" name="confirmPassword" onChange={onChange} />
            </Stack>
            {errors.map(function(error){
                return (
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>Register</Button>
        </Container>
    )

}