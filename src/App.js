import { BrowserRouter, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { routeComponents } from './Components/listItems';
import Navbar from './Components/Navbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Copyright from './Components/copyright';
// import { Amplify } from 'aws-amplify';
// import Dashboard from './Components/Dashboard';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

const mdTheme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar />
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
                        <Routes>{routeComponents}</Routes>
                        <Copyright />
                    </Box>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}
