import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';




const Addroom = () => {
  const [formInfo, setFormInfo] = useState({
    lang1: "",
    lang2: "",
    desc: "",
  });

  const [loggedinuser, setloggedinuser] = useState({})
  let navigate = useNavigate();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
      .then(res => {
        console.log(res.data.user)
        setloggedinuser(res.data.user)
        console.log(loggedinuser)
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

  const [errors, setErrors] = useState({});

  // let navigate = useNavigate();

  const changehandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const adding = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/addin", formInfo)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/dashboard");
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
  };


  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-around">


        <h4  >Welcome  {loggedinuser.lastName} {loggedinuser.lastName}</h4>



        <div className='d-flex justify-content'>
          <button className="btn btn-outline-secondary me-5" type="button">
            <a className="text-dark text-decoration-none " href='/profile' >Profile</a></button>
          <button onClick={logout} className="text-dark btn btn-sm btn-outline-secondary ml-3 " type="button">Logout</button>
          {loggedinuser.admin ? <button className="text-dark btn btn-outline-secondary ml-3" type="button">
            <a className="text-dark text-decoration-none " href='/Addin' >Add Room</a></button> : ""}
        </div>
      </nav>

      <div className="demo form-bg">
        <div className="container-fluid" >
          <div className="row  " >
            <div className="margin ">
              <div className="col-md col-md">
                <form onSubmit={adding}>
                  <div className="form-group d-flex flex-column" >
                    <h1 className="heading">Add a room</h1>
                    <TextField className="mb-3 " id="standard-basic" label="First Language" name="lang1" onChange={changehandler} variant="standard" />
                    {errors.lang1 ? <p className="text-danger">{errors.lang1.message}</p> : ""}

                    <TextField className="mb-3" id="standard-basic" label="Second Language" name="lang2" onChange={changehandler} variant="standard" />
                    {errors.lang2 ? <p className="text-danger">{errors.lang2.message}</p> : ""}

                    <TextField className="mb-3" id="standard-basic" label="Description" name="desc" onChange={changehandler} variant="standard" />
                    {errors.desc ? <p className="text-danger">{errors.desc.message}</p> : ""}

                    <Box sx={{ '& button': { m: 1 } }}>
                      <Button variant="contained" type="submit">
                        Add
                      </Button>
                      <Button variant="contained" color="success">
                        <a className="text-white text-decoration-none " href='/dashboard' >Cancel</a>
                      </Button>
                    </Box>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addroom;
