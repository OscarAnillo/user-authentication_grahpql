const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloError } = require("@apollo/server/errors")

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Message = require("./Models/Message");
const User = require("./Models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const resolvers = {
    Query: {
        allMessages: async () => Message.find({}),
        findMessage: async (_, { ID } ) => {
            Message.findById(ID)
        }, 
        user: async (_, { ID } ) => {
            User.findById(ID)
        }
    },
    Mutation: {
        createMessage: async (_, {messageInput: { text, username }}) => {
            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            });

            const res = await newMessage.save();
            //console.log(res);
            return {
                id: res.id,
                ...res._doc
            };
        },
        registerUser: async (_, { registerInput: { username, email, password }}) => {

            // See if user has already registered with email
            const oldUser = await User.findOne({ email });
            if(oldUser) {
                throw new ApolloError(`An user was already registered with the email ${email}, USER_ALREADY_EXISTS`)        
            }

            // Encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Build mongoose model
            const newUser = new User({
              username: username,
              email: email.toLowerCase(),
              password: encryptedPassword
            })

            // Create a tokoen with jsonwebtoken
            const token = jwt.sign(
                { user_id: newUser._id, email }, 
                    "UNSAFE_STRING", 
                {
                    expiresIn: "2h"
                }
            )

            newUser.token = token;

            // Save the user in MongoDB
            const res = await newUser.save();

            return {
                id: res.id,
                ...res.__doc
            }

        },
        loginUser: async (_, { loginInput: { email, password }}) => {
            
            // See if user exists with email
            const user = await User.findOne({ email });
            
            // Check if the entered password is equal to the registered one
            if(user && (await bcrypt.compare(password, user.password))) {

                // Create a new token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );

                // Attach token to user model that we found above
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }

            } else {
                // If user does not exists, return error!
                throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
            }
        } 

    }
}


const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "graphql/schema.graphql"), 'utf-8'),
    resolvers
})

startStandaloneServer(server, {
    listen: {
        port: process.env.PORT
    },
    // context: async ({ req, res }) => {
    //     const authHeader = req.headers.authorization || "";
    //     if(authHeader){
    //         //Bearer
    //         const token = authHeader.split("Bearer ");
    //         if(token){
    //             try {
    //                 const user = jwt.verify(token, "UNSAFE_STRING");
    //                 return user;
    //             } catch (err) {
    //                 throw new ApolloError("Invalid/Expired token")
    //             }
    //         }
    //         throw new Error("Authentication token must be 'Bearer [token]");
    //     }
    //     throw new Error("Authorization header must be provided");
    // }
})
.then((res) => console.log(`Server running on port ${res.url}`));