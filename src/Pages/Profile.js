import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser(params) {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
    }

    if (!user) {
        return null;
    } else {
        return (
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <h1>{user.username}</h1>
                            <h2>{user.attributes.email}</h2>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withAuthenticator(Profile);