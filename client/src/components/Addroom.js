import React, { useState } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const Addroom = () => {
  const [formInfo, setFormInfo] = useState({
    lang1: "",
    lang2: "",
    desc: "",
  });

  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

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
      .catch((err) => {
        console.log(err);
      });
  };


  return (

<div class="demo form-bg">
    <div class="container-fluid" >
        <div class="row  " >
            <div className="margin ">
                <div class="col-md col-md">
                    <form onSubmit={adding}>
                        <div class="form-group d-flex flex-column" >
                        <h1 class="heading">Add a room</h1>
                    
                            <TextField className="mb-3 " id="standard-basic" label="First Language" name="lang1"    onChange={changehandler} variant="standard" />

                            <TextField  className="mb-3" id="standard-basic" label="Second Language" name="lang2"    onChange={changehandler} variant="standard" />

                            <TextField className="mb-3" id="standard-basic" label="Description" name="desc"    onChange={changehandler} variant="standard" />

                            <Button variant="contained" type="submit">
                                Add
                            </Button>
                    
                        </div>
                    </form>
            </div>
        </div>
    </div>
</div>
</div>
);
};

export default Addroom;
