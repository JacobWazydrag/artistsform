import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader'; sublinks
import { Link, Route } from 'react-router-dom';
import { authenticatedUserlinks, unAuthenticatedUserlinks } from './links';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: darkslategrey;
`;

export const userAuthenticatedListItems = authenticatedUserlinks.map((link, index) => {
    return (
        <React.Fragment key={link.title + index}>
            <StyledLink to={link.url}>
                <ListItemButton>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText
                        style={{ textDecoration: 'none' }}
                        primary={link.title}
                    />
                </ListItemButton>
            </StyledLink>
        </React.Fragment>
    );
});

export const userAuthenticatedRouteComponents = authenticatedUserlinks.map((link, index) => {
    return (
        <Route
            key={index + link.title + index}
            path={link.url}
            element={link.component}
            exact
        ></Route>
    );
});
export const userUnAuthenticatedListItems = unAuthenticatedUserlinks.map((link, index) => {
    return (
        <React.Fragment key={link.title + index}>
            <StyledLink to={link.url}>
                <ListItemButton>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText
                        style={{ textDecoration: 'none' }}
                        primary={link.title}
                    />
                </ListItemButton>
            </StyledLink>
        </React.Fragment>
    );
});

export const userUnAuthenticatedRouteComponents = unAuthenticatedUserlinks.map((link, index) => {
    return (
        <Route
            key={index + link.title + index}
            path={link.url}
            element={link.component}
            exact
        ></Route>
    );
});

export const secondaryListItems = (
    <React.Fragment>
        {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
    </React.Fragment>
);
