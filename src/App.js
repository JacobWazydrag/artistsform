import { useState, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import {
    userAuthenticatedRouteComponents,
    userUnAuthenticatedRouteComponents
} from './Components/listItems';
import Navbar from './Components/Navbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Copyright from './Components/copyright';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
//need this to create artwork
// import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';
// import { createArtwork } from './graphql/mutations';
// import { Button } from '@mui/material';
const mdTheme = createTheme();

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(false);

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

    // const createArtworks = (event) => {
    //     const artwork = {
    //         id: 1,
    //         title: 'number one',
    //         description: 'description test',
    //         status: 'sold!'
    //     };

    //     const input = {
    //         artwork
    //     };
    //     console.log(input);
    //     API.graphql(graphqlOperation(createArtwork,{ input: artwork }));
    // };

    return (
        <Authenticator socialProviders={['amazon', 'facebook', 'google']}>
            {({ signOut, user }) => (
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <BrowserRouter>
                            <Navbar authenticatedUser={authenticatedUser} />
                            {/* <Button
                                onClick={() => {
                                    createArtworks();
                                }}
                            >
                                createArtwork
                            </Button> */}
                            <Box
                                component='main'
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                                    flexGrow: 1,
                                    height: '100vh',
                                }}
                            >
                                <Toolbar />
                                <Routes>
                                    {authenticatedUser
                                        ? userAuthenticatedRouteComponents
                                        : userUnAuthenticatedRouteComponents}
                                </Routes>
                                <Copyright />
                            </Box>
                        </BrowserRouter>
                    </Box>
                </ThemeProvider>
            )}
        </Authenticator>
    );
}

export default withAuthenticator(App);
