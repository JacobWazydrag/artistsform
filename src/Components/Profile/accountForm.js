import { useEffect, useState } from 'react';
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
    Stack,
    Tooltip
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { countries } from '../listItems';
var _ = require('lodash');

export const AccountProfileDetails = (props) => {
    const [values, setValues] = useState({});
    const [userValues, setUserValues] = useState({});
    const [formFeedback, setFormFeedback] = useState(null);

    const handleChange = (event) => {
        if (event.target.value) {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
        } else {
            delete values[event.target.name];
            setValues({
                ...values
            });
        }
    };

    const updateUsers = async (user) => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, values);
            setFormFeedback('success');
        } catch (error) {
            console.log(error);
            setFormFeedback('error');
        }
    };

    const closeDialog = () => {
        setFormFeedback(null);
    };

    const initializeForm = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            let valuesObj = {};
            for (const [key, value] of Object.entries(user.attributes)) {
                if (key !== 'sub') {
                    valuesObj[key] = value;
                }
            }
            setValues(valuesObj);
            setUserValues(valuesObj);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initializeForm();
    }, []);

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <form autoComplete='on' {...props}>
                    <Card>
                        <CardHeader subheader='The information can be edited' title='Profile' />
                        <Divider />
                        <CardContent>
                            {Object.keys(values).length > 0 ? (
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name='name'
                                            onChange={handleChange}
                                            value={values.name ? values.name : ''}
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
                                            value={values.email ? values.email : ''}
                                            variant='outlined'
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <MuiPhoneNumber
                                            name='phone_number'
                                            label='Phone Number'
                                            data-cy='user-phone'
                                            defaultCountry={'us'}
                                            value={values.phone_number ? values.phone_number : ''}
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: 'phone_number',
                                                        value: '+' + e.replace(/\D/g, '')
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
                                            getOptionLabel={(option) => option.label}
                                            inputValue={values.zoneinfo ? values.zoneinfo : ''}
                                            renderOption={(props, option) => (
                                                <Box
                                                    component='li'
                                                    sx={{
                                                        '& > img': {
                                                            mr: 2,
                                                            flexShrink: 0
                                                        }
                                                    }}
                                                    {...props}>
                                                    <img
                                                        loading='lazy'
                                                        width='20'
                                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                        alt=''
                                                    />
                                                    {option.label} ({option.code}) +{option.phone}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label='Choose a country'
                                                    name='zoneinfo'
                                                    inputProps={{
                                                        ...params.inputProps
                                                    }}
                                                    onSelect={handleChange}
                                                    value={values.zoneinfo ? values.zoneinfo : ''}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='Street'
                                            name='custom:street'
                                            onChange={handleChange}
                                            value={values['custom:street'] ? values['custom:street'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='City'
                                            name='custom:city'
                                            onChange={handleChange}
                                            value={values['custom:city'] ? values['custom:city'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='State'
                                            name='custom:state'
                                            onChange={handleChange}
                                            value={values['custom:state'] ? values['custom:state'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='Zip'
                                            name='custom:zip'
                                            onChange={handleChange}
                                            value={values['custom:zip'] ? values['custom:zip'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='twitter url'
                                            name='custom:twitter'
                                            onChange={handleChange}
                                            value={values['custom:twitter'] ? values['custom:twitter'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='instagram url'
                                            name='custom:instagram'
                                            onChange={handleChange}
                                            value={values['custom:instagram'] ? values['custom:instagram'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='facebook url'
                                            name='custom:facebook'
                                            onChange={handleChange}
                                            value={values['custom:facebook'] ? values['custom:facebook'] : ''}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label='personalWebsite url'
                                            name='custom:personalWebsite'
                                            onChange={handleChange}
                                            value={
                                                values['custom:personalWebsite'] ? values['custom:personalWebsite'] : ''
                                            }
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            maxRows={10}
                                            label='Short Biography'
                                            name='profile'
                                            onChange={handleChange}
                                            value={values.profile ? values.profile : ''}
                                            variant='outlined'
                                            error={!values.profile}
                                            inputProps={{ maxLength: 2048 }}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            )}
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}>
                            <Tooltip title={_.isEqual(values, userValues) ? 'No changes to update' : ''}>
                                <span>
                                    <Button
                                        onClick={() => updateUsers()}
                                        color='primary'
                                        variant='contained'
                                        disabled={_.isEqual(values, userValues)}>
                                        Update details
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>
                    </Card>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {formFeedback && (
                            <Alert
                                severity={formFeedback}
                                onClose={() => {
                                    closeDialog();
                                }}>
                                {formFeedback ? (formFeedback === 'success' ? 'Saved!' : 'Error!') : ''}
                            </Alert>
                        )}
                    </Stack>
                </form>
            )}
        </Authenticator>
    );
};
