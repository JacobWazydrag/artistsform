import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from '../Components/Artwork/artCard';
// import { AccountProfileDetails } from '../Components/Artwork/artDetails';
import { listArtworks } from '../graphql/queries';
import { API, graphqlOperation, Storage } from 'aws-amplify';
// import { useEffect, useState } from 'react';
// import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import { styled } from '@mui/material/styles';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { useState } from 'react';
import SingleSelectArtForm from '../Components/Artwork/singleSelectArtForm';
import MultiSelectArtForm from '../Components/Artwork/multiSelectArtForm';
import _ from 'lodash';
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius
        }
    }
}));
export default function Artwork() {
    const [alignment, setAlignment] = useState('single');

    const handleAlignment = (event, newAlignment) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState([]);
    const onArtwork = async (prevQuery, newData) => {
        const result = await API.graphql(graphqlOperation(listArtworks));
        setImages(result.data.listArtworks.items);
    };
    const getUrl = async () => {
        const urlKeyArr = [];
        images.map((el, idx) => {
            urlKeyArr.push(el.file.key);
        });

        let promisesOfS3Objects = urlKeyArr.map(function (key) {
            return Storage.get(key)
                .then(function (file) {
                    return file;
                })
                .catch(function (err) {
                    return err;
                });
        });
        let promiseArr = Promise.all(promisesOfS3Objects)
            .then((e) => {
                return e;
            }) // callbackSuccess is called with an array of string
            .catch(function (err) {
                console.log(err);
            });
        // promiseArr
        //     .then((r) => {
        //         urlPathArr = r;
        //     })
        //     .catch((er) => {
        //         console.log(er);
        //     });
        const resultingArr = await promiseArr;
        setUrl(resultingArr);
        // await _.map((el, idx) => {
        // Storage.get(urlKeyArr[2])
        //     .then((result) => console.log(result))
        //     .catch((err) => console.log(err));
        // });
        // console.log(urlPathArr)
        // await urlKeyArr.map((el, idx) => {
        //     try {
        //         Storage.get(el)
        //             .then((result) => urlPathArr.push(result))
        //             .catch((err) => console.log(err));
        //         // const fileAccessURL = await Storage.get(el, {
        //         //     expires: 60
        //         // });
        //         // console.log('access url', fileAccessURL);
        //         // setAudioURL(fileAccessURL);
        //     } catch (error) {
        //         console.error('error accessing the file from s3', error);
        //         // setAudioURL('');
        //         // setSongPlaying('');
        //     }
        // });
        // console.log(urlPathArr)
    };

    useEffect(() => {
        onArtwork();
    }, []);
    useEffect(() => {
        if (images.length > 0 && url.length === 0) {
            getUrl();
        }
    }, [images]);

    return (
        <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Box
                            component='main'
                            sx={{
                                flexGrow: 1,
                                py: 2
                            }}>
                            <Container maxWidth='lg'>
                                <Grid container spacing={3}>
                                    <Grid item lg={1.3} md={6} xs={12}>
                                        <div>
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    display: 'flex',
                                                    border: (theme) =>
                                                        `1px solid ${theme.palette.divider}`,
                                                    flexWrap: 'wrap'
                                                }}>
                                                <StyledToggleButtonGroup
                                                    size='small'
                                                    value={alignment}
                                                    exclusive
                                                    onChange={handleAlignment}
                                                    aria-label='image upload setting'>
                                                    <ToggleButton
                                                        value='single'
                                                        aria-label='left aligned'>
                                                        <ImageIcon />
                                                    </ToggleButton>
                                                </StyledToggleButtonGroup>
                                                <Divider
                                                    flexItem
                                                    orientation='vertical'
                                                    sx={{ mx: 0.5, my: 1 }}
                                                />
                                                <StyledToggleButtonGroup
                                                    size='small'
                                                    value={alignment}
                                                    exclusive
                                                    onChange={handleAlignment}
                                                    aria-label='image upload setting'>
                                                    <ToggleButton
                                                        value='multi'
                                                        aria-label='right aligned'>
                                                        <BurstModeIcon />
                                                    </ToggleButton>
                                                </StyledToggleButtonGroup>
                                            </Paper>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item lg={8} md={6} xs={12}>
                                    {alignment === 'single' ? (
                                        <SingleSelectArtForm />
                                    ) : (
                                        <MultiSelectArtForm />
                                    )}
                                </Grid>
                            </Grid>
                        </Container>
                        {url.length > 0 ? (
                            <div style={{width: '1000'}}>
                                <Gallery
                                    photos={photos(url)}
                                    onClick={openLightbox}
                                />
                                <ModalGateway>
                                    {viewerIsOpen ? (
                                        <Modal onClose={closeLightbox}>
                                            <Carousel
                                                currentIndex={currentImage}
                                                views={photos(url).map((x) => ({
                                                    ...x,
                                                    srcset: x.srcSet,
                                                    caption: x.title
                                                }))}
                                            />
                                        </Modal>
                                    ) : null}
                                </ModalGateway>
                            </div>
                        ) : null}

                        {/* {images.map((element) => {
                            return (
                                <div> */}
                        {/* <div>
                            {url ? (
                                <img src={url} />
                            ) : (
                                <button onClick={() => toggleArt()}></button>
                            )}
                        </div> */}
                        {/* </div> */}
                        {/* );
                        })} */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
