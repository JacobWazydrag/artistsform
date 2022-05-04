import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Authenticator } from '@aws-amplify/ui-react';
import { createArtwork } from '../../graphql/mutations';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export default function SingleSelectArtForm(props) {
    const [values, setValues] = useState({
        description: '',
        title: '',
        status: '',
        file: '',
        percentUploaded: 0,
        imagePreview: '',
        isUploading: false
    });
    const [files, setFiles] = useState([]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        },
        maxFiles: 1
    });
    const thumbs = files.map((file, index) => (
        <img
            key={index}
            src={file.preview}
            style={{
                // width: 'auto',
                // height: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%'
            }}
            alt={'preview'}
            // Revoke data uri after image is loaded
            onLoad={() => {
                URL.revokeObjectURL(file.preview);
            }}
        />
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const [formFeedback, setFormFeedback] = useState(null);

    const handleChange = (event) => {
        // console.log(values);
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const createArtworks = async (event) => {
        try {
            setValues({ isUploading: true });
            const { identityId } = await Auth.currentCredentials();
            const filename = `${identityId}/${Date.now()}-${files[0].name}`;
            const uploadedFile = await Storage.put(filename, files[0], {
                contentType: files[0].type,
                progressCallback: (progress) => {
                    console.log(
                        `Uploaded: ${progress.loaded}/${progress.total}`
                    );
                    const percentUploaded = Math.round(
                        (progress.loaded / progress.total) * 100
                    );
                    setValues({ percentUploaded });
                }
            });
            const file = {
                key: uploadedFile.key,
                bucket: aws_exports.aws_user_files_s3_bucket,
                region: aws_exports.aws_project_region
            };
            const input = {
                title: values.title,
                description: values.description,
                status: values.status,
                file: file
            };
            const result = await API.graphql(
                graphqlOperation(createArtwork, { input })
            );
            console.log('Created artwork', result);
            setValues({
                description: '',
                title: '',
                status: '',
                file: '',
                percentUploaded: 0,
                imagePreview: '',
                isUploading: false
            });
        } catch (error) {
            console.error('Error adding artwork', error);
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
                                        error={!values.title}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='description'
                                        label='Description'
                                        onChange={handleChange}
                                        value={values.description}
                                        variant='outlined'
                                        error={!values.description}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        name='status'
                                        label='Status'
                                        onChange={handleChange}
                                        value={values.status}
                                        variant='outlined'
                                        error={!values.status}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}></Grid>
                                <Grid item md={6} xs={12}>
                                    <Card
                                        {...getRootProps()}
                                        style={{
                                            backgroundColor: isDragActive
                                                ? 'wheat'
                                                : 'white',
                                            cursor: 'pointer',
                                            textAlign: '-webkit-center'
                                        }}
                                        elevation={files.length !== 0 ? 12 : 3}>
                                        <CardContent>
                                            {files.length !== 0 ? (
                                                // <aside style={thumbsContainer}>
                                                <>{thumbs}</>
                                            ) : (
                                                // </aside>
                                                <>
                                                    <Typography
                                                        sx={{ fontSize: 14 }}
                                                        color='text.secondary'
                                                        gutterBottom>
                                                        Photo Upload
                                                    </Typography>
                                                    <Typography
                                                        variant='h5'
                                                        component='div'>
                                                        Clik to upload or Drag{' '}
                                                        {'&'} Drop
                                                    </Typography>
                                                    <CardActions
                                                        style={{
                                                            height: 300,
                                                            width: 'max-content',
                                                            alignItems:
                                                                'self-end'
                                                        }}>
                                                        <input
                                                            accept='image/*'
                                                            {...getInputProps()}
                                                        />
                                                        {isDragActive ? (
                                                            <button>
                                                                <AddPhotoAlternateIcon />
                                                                Drop the files
                                                                here ...
                                                            </button>
                                                        ) : (
                                                            <Button
                                                                style={{
                                                                    backgroundColor:
                                                                        '#ff7800',
                                                                    color: 'white'
                                                                }}>
                                                                <AddPhotoAlternateIcon />{' '}
                                                                Click to Upload
                                                                or Drag n' Drop
                                                            </Button>
                                                        )}
                                                    </CardActions>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2
                            }}>
                            <Button
                                onClick={() => createArtworks()}
                                disabled={!values.title || !values.status || !values.description || !files.length > 0}
                                color='primary'
                                variant='contained'>
                                <FileUploadIcon/>Add to Collection
                            </Button>
                        </Box>
                    </Card>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {formFeedback && (
                            <Alert
                                severity={formFeedback}
                                onClose={() => {
                                    closeDialog();
                                }}>
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
}
