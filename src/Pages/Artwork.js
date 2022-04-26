import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import { useState, useCallback } from 'react';
// import Gallery from 'react-photo-gallery';
// import Carousel, { Modal, ModalGateway } from 'react-images';
// import { photos } from '../Components/Artwork/artCard';
import './styles.css';
import { AccountProfileDetails } from '../Components/Artwork/artDetails';

export default function Artwork() {
    // const [currentImage, setCurrentImage] = useState(0);
    // const [viewerIsOpen, setViewerIsOpen] = useState(false);

    // const openLightbox = useCallback((event, { photo, index }) => {
    //     setCurrentImage(index);
    //     setViewerIsOpen(true);
    // }, []);

    // const closeLightbox = () => {
    //     setCurrentImage(0);
    //     setViewerIsOpen(false);
    // };
    return (
        <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            component='main'
                            sx={{
                                flexGrow: 1,
                                py: 8
                            }}
                        >
                            <Container maxWidth='lg'>
                                <Grid container spacing={3}>
                                    <Grid item lg={8} md={6} xs={12}>
                                        <AccountProfileDetails />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                        {/* <div>
                            <Gallery photos={photos} onClick={openLightbox} />
                            <ModalGateway>
                                {viewerIsOpen ? (
                                    <Modal onClose={closeLightbox}>
                                        <Carousel
                                            currentIndex={currentImage}
                                            views={photos.map((x) => ({
                                                ...x,
                                                srcset: x.srcSet,
                                                caption: x.title
                                            }))}
                                        />
                                    </Modal>
                                ) : null}
                            </ModalGateway>
                        </div> */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
