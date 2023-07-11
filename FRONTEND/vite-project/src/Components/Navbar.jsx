import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';
import { useContext } from 'react';

export const NavBar = () => {
    const { user, logout} = useContext(AuthContext);
    let navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5' component="div">
                        <Link to="/">ReactLogin with GraphQL</Link>
                    </Typography>
                    <Box alignItems="right" sx={{flexGrow: 1, textAlign: "right"}}>
                        { user ?
                            <>
                                <Button style={{textDecoration:"none", color:"#fff"}} onClick={onLogout}>Logout</Button>
                            </>
                            :
                            <>
                                <Link to="/login" style={{textDecoration:"none", color:"#fff", marginRight:"10px"}}>Login</Link>
                                <Link to="/register" style={{textDecoration:"none", color:"#fff"}}>Register</Link>
                            </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}