import React from 'react';
import Chat from './Chat';
import io from "socket.io-client";
const socket = io();


const SignIn = () => {
    return (
        <div className="row">
            <div className="col">
                <Chat></Chat>
            </div>
        </div>
    );
};


export default SignIn;