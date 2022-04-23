import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from "react-router-dom";
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


function UserSignOut() {
    Auth.signOut();
}

export default withAuthenticator(UserSignOut);
