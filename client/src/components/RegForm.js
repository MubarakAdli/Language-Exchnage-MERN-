import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegForm = () => {

  const[formInfo,setFormInfo]=useState({firtsName:"" , lastName:"", 
  email:"" , nativeLang:"", 
  password:"" , confirm:""});

  let navigate = useNavigate();

  const changeHandler=(e)=>{
    setFormInfo({...formInfo,[e.target.name]:e.target.value})

  }

  const register=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', formInfo,{ withCredentials: true })
    .then(res=>{console.log(res)
    }) ;navigate("/test")             

    .catch(err=>{
      console.log("hassan")
    })
  }

  return (
    <div>
      <h1>Register to Join Us</h1>
      <form onSubmit={register}>
        <div className='form-group'>
          <label>First Name</label>
          <input type="text" className='form-control' name="firstName" onChange={changeHandler} />
        </div>

        <div className='form-group'>
          <label>Last Name</label>
          <input type="text" className='form-control' name="lastName"  onChange={changeHandler} />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input type="text" className='form-control' name="email" onChange={changeHandler} />
        </div>

        <div className='form-group'>
          <label>Native Language</label>
          <input type="text" className='form-control' name="nativeLang" onChange={changeHandler} />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type="password" className='form-control' name="password" onChange={changeHandler} />
        </div>

        <div className='form-group'>
          <label>Confirm PW</label>
          <input type="password" className='form-control' name="confirm" onChange={changeHandler} />
        </div>

        <input type="submit" value="Register" className='btn btn-success'/>
      </form>
    </div>
  )
}

export default RegForm