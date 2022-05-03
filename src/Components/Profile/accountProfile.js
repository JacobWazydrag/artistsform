import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import { Authenticator } from '@aws-amplify/ui-react';
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const AccountProfile = (props) => {
    async function uploadPhoto(file) {
        Storage.put('profile.png', file, {
            contentType: 'image/png',
            level: 'private'
        })
            .then((result) => {
                console.log(result);
                // for the sake of the demo, force a reload to see the uploaded picture
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <Card {...props}>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <AmplifyS3Image level='private' imgKey={'profile.png'} />
                            <Typography color='textPrimary' gutterBottom variant='h5'>
                                {user.attributes.name}
                            </Typography>
                            <Typography color='textSecondary' variant='body2'>
                                {`${user.attributes.city ? user.attributes.city : ''} ${
                                    user.attributes.zoneinfo ? user.attributes.zoneinfo : ''
                                }`}
                            </Typography>
                            <Typography color='textSecondary' variant='body2'>
                                {user.timezone}
                            </Typography>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                            style={{
                                backgroundColor: '#ff7800',
                                color: 'white'
                            }}>
                            <AddPhotoAlternateIcon />{' '}
                            <input
                                style={{ opacity: 0 }}
                                type='file'
                                accept='image/*'
                                onChange={(e) => uploadPhoto(e.target.files[0])}
                            />
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Authenticator>
    );
};
