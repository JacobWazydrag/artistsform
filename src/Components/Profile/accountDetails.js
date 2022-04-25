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
    Autocomplete,
    Alert,
    Stack
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { countries } from '../listItems';
export const AccountProfileDetails = (props) => {
    const [values, setValues] = useState({});
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
                            subheader='The information can be edited'
                            title='Profile'
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='name'
                                        onChange={handleChange}
                                        value={user.attributes.name}
                                        variant='outlined'
                                        required
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='email'
                                        onChange={handleChange}
                                        required
                                        value={user.attributes.email}
                                        variant='outlined'
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <MuiPhoneNumber
                                        name='phone'
                                        label='Phone Number'
                                        data-cy='user-phone'
                                        defaultCountry={'us'}
                                        value={
                                            user.attributes.phone_number
                                                ? user.attributes.phone_number
                                                : values.phone
                                        }
                                        onChange={(e) =>
                                            handleChange({
                                                target: {
                                                    name: 'phone',
                                                    value: e
                                                }
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Autocomplete
                                        id='country-select-demo'
                                        fullWidth
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        renderOption={(props, option) => (
                                            <Box
                                                component='li'
                                                sx={{
                                                    '& > img': {
                                                        mr: 2,
                                                        flexShrink: 0
                                                    }
                                                }}
                                                {...props}
                                            >
                                                <img
                                                    loading='lazy'
                                                    width='20'
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=''
                                                />
                                                {option.label} ({option.code}) +
                                                {option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label='Choose a country'
                                                name='zoneinfo'
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                                }}
                                                onSelect={handleChange}
                                                value={values.zone}
                                            />
                                        )}
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
                                {formFeedback ? formFeedback === 'success' ? 'Saved!' : 'Error!' : ''}
                            </Alert>
                        )}
                    </Stack>
                </form>
            )}
        </Authenticator>
    );
};
