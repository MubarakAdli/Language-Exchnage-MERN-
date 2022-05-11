import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



const Edit = (props) => {
    const [loggedinuser, setloggedinuser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nativeLang, setNativeLang] = useState("")
    const [errors, setErrors] = useState()

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin",{ withCredentials: true })
            .then(res => {
                console.log(res)
                setFirstName(res.data.user.firstName)
                setLastName(res.data.user.lastName)
                setNativeLang(res.data.user.nativeLang)

                setLoaded(true)
            })
            .catch(err => {
                console.log("errrrrrrr", err)
                navigate("/")
            })
    }, [])

    let navigate = useNavigate();


    // const changehandler = (e)=>{
    //     setFormInfo({
    //         ...formInfo,
    //         [e.target.name]:e.target.value
    //     })
    // }
    const logout = (e) => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
      }
      

    const updatePerson = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/loggedin', { firstName, lastName, nativeLang }, { withCredentials: true })
            .then(res => {
                navigate("/profile");
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        
        <>
            <nav className="navbar navbar-light bg-light justify-content-around">





                <div className='d-flex justify-content'>
                    <button className="btn btn-outline-secondary me-5" type="button">
                        <a className="text-dark text-decoration-none " href='/profile'>Profile</a></button>
                    <button onClick={logout} className="text-dark btn btn-sm btn-outline-secondary ml-3 " type="button">Logout</button>

                </div>
                
            </nav>
        <div className="demo form-bg">
<div className="container-fluid" >
    <div className="row  " >
        <div className="margin ">
            <div className="col-md col-md"></div>
        {loaded &&
            <form onSubmit={updatePerson}>
                <div className="form-group d-flex flex-column" >
                    <h1 className="heading">Edit Profile</h1>

                <TextField className="mb-3 " id="standard-basic" label="First Name" name="firstName"  value={firstName}  onChange={e => setFirstName(e.target.value)} variant="standard" />
                <TextField className="mb-3 " id="standard-basic" label="Last Name" name="lastName"  value={lastName}  onChange={e => setLastName(e.target.value)} variant="standard" />
                <TextField className="mb-3 " id="standard-basic" label="Native Language" name="nativeLang"  value={nativeLang}  onChange={e => setNativeLang(e.target.value)} variant="standard" />
                                <Box sx={{ '& button': { m: 1 } }}>
                        
                        <Button variant="contained" color="success" type="submit">
                        submit
                    </Button>
                    </Box>
                        
                    </div>
                </form>}
        </div>
    </div>
</div>
</div>
    </>
        
    );
};
    
export default Edit;
