import React from 'react';
import CodeVerification from './CodeVerification';
import CreatePassword from './CreatePassword';
import Login from './Login';
import Signup from './Signup';


const Auth = () => {
    return (
        <>
            <CodeVerification />
            <CreatePassword />
            <Login />
            <Signup />
        </>
    );
};

export default Auth;