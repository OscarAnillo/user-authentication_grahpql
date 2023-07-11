import { gql } from '@apollo/client';

export const ALL_MESSAGES = gql`
    query {
        allMessages {
            text
            createdAt
            createdBy
        }
    }
`
export const REGISTER_USER = gql`
    mutation registerUser($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput){
            username
            email
            token
        }
    }
`

export const LOGIN_USER = gql`
    mutation loginUser($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput){
            email
            username
            token
        }
    }
`