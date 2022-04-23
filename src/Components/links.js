//icons
import PaletteIcon from '@mui/icons-material/Palette';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
//components
import Artwork from '../Pages/Artwork';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import SignIn from '../Pages/SignIn';
import SignOut from '../Components/signout';

export const authenticatedUserlinks = [
    { 'title': 'Artworks', 'url': '/Artworks', 'icon': <PaletteIcon />, "component": <Artwork/> },
    { 'title': 'Profile', 'url': '/profile', 'icon': <AccountCircleIcon />, "component": <Profile/> },
    { 'title': 'Home', 'url': '/', 'icon': <HomeIcon />, "component": <Home/> },
    { 'title': 'Profile', 'url': '/signOut', 'icon': <LogoutIcon />, "component": <SignOut/> },
];

export const unAuthenticatedUserlinks = [
    { 'title': 'Home', 'url': '/', 'icon': <AssignmentIndIcon />, "component": <SignIn/> },
];
