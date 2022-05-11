import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import '../App.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Profile = () => {

    const [loggedinuser, setloggedinuser] = useState(null)
    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)



    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                console.log(res)
                setloggedinuser(res.data.user)
                setLoaded(true)
            })
            .catch(err => {
                console.log("errrrrrrr", err)
                navigate("/")
            })
    }, [])


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

    return (
        <>
            {loaded &&
                <div>

                    {loggedinuser ?
                        <>
                            <nav className="navbar navbar-light bg-light justify-content-around">
                                <div className='d-flex justify-content'>
                                    <button className="btn btn-outline-secondary me-5" type="button">
                                        <a className="text-dark text-decoration-none " href='/Dashboard' >Dashboard</a></button>
                                    <button onClick={logout} className="text-dark btn btn-sm btn-outline-secondary ml-3 " type="button">Logout</button>
                                    {loggedinuser.admin ? <button className="text-dark btn btn-outline-secondary ml-3" type="button">
                                        <a className="text-dark text-decoration-none " href='/Addin' >Add Room</a></button> : ""}
                                </div>
                            </nav>
                            <div className="demo form-bg-4">
                                <Container minWidth="sm " maxWidth="lg" minHeight="sm " maxHeight="lg" sx={{ width: "40%", height: "40%" }}>
                                    <Box sx={{ flexGrow: 1 }} style={{ marginBottom:"200px",marginLeft:"150px" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8} >
                                                <Item style={{ backgroundColor: "blue", color: "white" }}
                                                >{loggedinuser.firstName} {loggedinuser.lastName} </Item>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Item style={{ backgroundColor: "blue", color: "white" }}> {loggedinuser.email} </Item>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Item style={{ backgroundColor: "blue", color: "white" }}>{loggedinuser.nativeLang} </Item>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Button variant="contained" color="success">
                                                    <Link to={'/Edit'} style={{ color: "white" }}>eDIT pROFILE</Link></Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Container>

                            </div></>
                        :
                        <h1>Please log in first</h1>}
                </div>}
        </>
    );
};


export default Profile;