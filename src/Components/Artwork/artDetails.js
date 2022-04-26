import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Alert,
    Stack
} from '@mui/material';
import { Authenticator } from '@aws-amplify/ui-react';
import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react/legacy';
import { Auth } from 'aws-amplify';
export const AccountProfileDetails = (props) => {
    const [values, setValues] = useState({
        description: '',
        title: '',
        status: '',
        image: '',
        percentUploaded: 0,
        imagePreview: '',
        isUploading: false
    });
    const [formFeedback, setFormFeedback] = useState(null);

    const handleChange = (event) => {
        console.log(event);
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const updateUsers = async (user) => {
        console.log(values);
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, {
                zoneinfo: values.zoneinfo
            });
            setFormFeedback('success');
        } catch (error) {
            console.log(error);
            setFormFeedback('error');
        }
    };

    const closeDialog = () => {
        setFormFeedback(null);
    };

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <form autoComplete='on' {...props}>
                    <Card>
                        <CardHeader
                            subheader='Please use this form to add to your collection'
                            title='Artwork'
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='title'
                                        label='Title'
                                        onChange={handleChange}
                                        value={values.title}
                                        variant='outlined'
                                        required
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='description'
                                        label='Description'
                                        onChange={handleChange}
                                        required
                                        value={values.description}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='status'
                                        label='Status'
                                        onChange={handleChange}
                                        required
                                        value={values.status}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    {values.percentUploaded > 0 && (
                                        <div>
                                            material progress here
                                            {values.percentUploaded}
                                        </div>
                                        // <Progress
                                        //     type='circle'
                                        //     className='progress'
                                        //     percentage={values.percentUploaded}
                                        // />
                                    )}
                                    <AmplifyS3ImagePicker
                                        headerTitle='Artwork Image'
                                        onLoad={(url) =>
                                            setValues({ imagePreview: url })
                                        }
                                        onPick={(file) =>
                                            setValues({ image: file })
                                        }
                                        // theme={{
                                        //     formContainer: {
                                        //         margin: 0,
                                        //         padding: '0.8em'
                                        //     },
                                        //     formSection: {
                                        //         display: 'flex',
                                        //         flexDirection: 'column',
                                        //         alignItems: 'center',
                                        //         justifyContent: 'center'
                                        //     },
                                        //     sectionBody: {
                                        //         margin: 0,
                                        //         width: '250px'
                                        //     },
                                        //     sectionHeader: {
                                        //         padding: '0.2em',
                                        //         color: 'var(--darkAmazonOrange)'
                                        //     },
                                        //     photoPickerButton: {
                                        //         display: 'none'
                                        //     }
                                        // }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}
                        >
                            <Button
                                onClick={() => updateUsers()}
                                color='primary'
                                variant='contained'
                            >
                                Save details
                            </Button>
                        </Box>
                    </Card>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {formFeedback && (
                            <Alert
                                severity={formFeedback}
                                onClose={() => {
                                    closeDialog();
                                }}
                            >
                                {formFeedback
                                    ? formFeedback === 'success'
                                        ? 'Saved!'
                                        : 'Error!'
                                    : ''}
                            </Alert>
                        )}
                    </Stack>
                </form>
            )}
        </Authenticator>
    );
};
