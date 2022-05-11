
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



const Register = () => {
    const [formInfo, setFormInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        nativeLang: "",
        password: "",
        confirm: ""
    })

    const [errors, setErrors] = useState([])

    let navigate = useNavigate();

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate("/dashboard")
                }
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }


    return (
        <div>
            <div >
                <div className="container-fluid" >
                    <div className="row  " >
                        <div className="margin ">
                            <div className="col-md col-md">
                                <h1>Register</h1>
                                {errors.map((err, index) => <p key={index}>{err}</p>)}
                                <form onSubmit={register}>

                                    <TextField className="mb-3 " id="standard-basic" label="First Name" name="firstName" onChange={changehandler} variant="standard" />
                                    {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ""}



                                    <TextField className="mb-3 " id="standard-basic" label="Last Name" name="lastName" onChange={changehandler} variant="standard" />
                                    {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : ""}



                                    <TextField className="mb-3 " id="standard-basic" label="Email" name="email" onChange={changehandler} variant="standard" />
                                    {errors.email ? <p className="text-danger">{errors.email.message}</p> : ""}


                                    <TextField className="mb-3 " id="standard-basic" label="Native Language" name="nativeLang" onChange={changehandler} variant="standard" />
                                    {errors.nativeLang ? <p className="text-danger">{errors.nativeLang.message}</p> : ""}


                                    <TextField className="mb-3 " type="password" id="standard-basic" label="Password" name="password" onChange={changehandler} variant="standard" />
                                    {errors.password ? <p className="text-danger">{errors.password.message}</p> : ""}

                        
                                    <TextField className="mb-3" type="password" id="standard-basic" label="Confirm PW" name="confirm" onChange={changehandler} variant="standard" />
                                    {errors.confirm ? <p className="text-danger">{errors.confirm.message}</p> : ""}

                                    <Box sx={{ '& button': { m: 1 } }}>
                                        <Button variant="contained" type="submit">
                                            Register
                                        </Button>

                                    </Box>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Register;