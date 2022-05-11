import React from 'react';
import Register from './Register'
import Login from './Login'


import '../App.css';
const SignIn = () => {
    return (
        <div className="row demo form-bg-2 d-flex">
            <div className="col">
                <Register></Register>
            </div>
            <div className="col">
                <Login></Login>
            </div>
            
        </div>
    );
};


export default SignIn;