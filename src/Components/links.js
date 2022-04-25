//icons
import PaletteIcon from '@mui/icons-material/Palette';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
//components
import Artwork from '../Pages/Artwork';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';

export const authenticatedUserlinks = [
    { 'title': 'Artworks', 'url': '/Artworks', 'icon': <PaletteIcon />, "component": <Artwork/> },
    { 'title': 'Profile', 'url': '/profile', 'icon': <AccountCircleIcon />, "component": <Profile/> },
    { 'title': 'Home', 'url': '/', 'icon': <HomeIcon />, "component": <Home/> },
    { 'title': 'Log Out', 'url': '/', 'icon': <LogoutIcon />, "component": null, action: 'sign out' },
];

export const unAuthenticatedUserlinks = [
];
