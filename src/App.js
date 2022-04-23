import { useState, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { userAuthenticatedRouteComponents, userUnAuthenticatedRouteComponents } from './Components/listItems';
import Navbar from './Components/Navbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Copyright from './Components/copyright';
import { Auth, Hub } from 'aws-amplify';
// import { Amplify } from 'aws-amplify';
// import Dashboard from './Components/Dashboard';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

const mdTheme = createTheme();

export default function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    const [authState, setAuthState] = useState('');

    function handleAuthStateChange(state) {
        if (state === 'signedin' || state === 'signedout') {
            setAuthState(state);
        }
    }

    async function authListener(params) {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signedIn':
                    return setAuthenticatedUser(true);
                case 'signedOut':
                    return setAuthenticatedUser(false);
                default:
                    break;
            }
        });

        try {
            await Auth.currentAuthenticatedUser();
            setAuthenticatedUser(true);
        } catch (err) {
            console.log('auth error: ', err);
        }
    }

    useEffect(() => {
        authListener();
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar authenticatedUser={authenticatedUser}/>
                    <Box
                        component='main'
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'hidden'
                        }}
                    >
                        <Toolbar />
                        <Routes>{authenticatedUser ? userAuthenticatedRouteComponents : userUnAuthenticatedRouteComponents}</Routes>
                        <Copyright />
                    </Box>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}
