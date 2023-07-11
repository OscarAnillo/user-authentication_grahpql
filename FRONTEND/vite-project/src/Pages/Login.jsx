import { useContext, useState } from "react";
import { AuthContext } from "../Context/auth-context";
import { useForm } from "../Utility/Hooks";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from '../Queries/queries';
import { useNavigate } from "react-router-dom";
import {TextField, Button, Container, Stack, Alert} from '@mui/material'



export const Login = () => {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const loginUserCallback = () => {
        console.log("Login called");
        loginUser()
    }

    const { onChange, onSubmit, values} = useForm(loginUserCallback, {
        email:"",
        password:""
    })

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            context.login(userData);
            navigate("/")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
        <h3>Login</h3>
        <p>This is the login page!</p>
        <Stack spacing={2} paddingBottom={2}>
            <TextField label="Email" name="email" onChange={onChange} />
            <TextField label="Password" name="password" onChange={onChange} />
        </Stack>
        {errors.map(function(error){
            return (
                <Alert severity="error">
                    {error.message}
                </Alert>
            )
        })}
        <Button variant="contained" onClick={onSubmit}>Login</Button>
    </Container>
    )
}