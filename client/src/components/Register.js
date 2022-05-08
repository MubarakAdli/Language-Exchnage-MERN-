import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
    .then(res=>{console.log(res);navigate("/test") 
    })             

    .catch(err=>{
      console.log(err)
    })
  }

  // const[formInfo,setFormInfo]=useState({firtsName:"" , lastName:"", 
  // email:"" , nativeLang:"", 
  // password:"" , confirm:""});

  // const [errors, setErrors] = useState([]); 

  // let navigate = useNavigate();

  // const changeHandler=(e)=>{
  //   setFormInfo({...formInfo,[e.target.name]:e.target.value})

  // }

  // const register=(e)=>{
  //   e.preventDefault();
  //   axios.post('http://localhost:8000/api/register', formInfo,{ withCredentials: true })
  //   .then(res=>{console.log(res);
  //     // if(res.data.errors){
  //     //   setErrors(res.data.errors)
  //     // }
  //     // else{
  //     //   navigate("/test")
  //     // }
  //   ;navigate("/test")})             

  //   .catch(err=>{
  //     const errorResponse = err.response.data.errors; // Get the errors from err.response.data
  //     const errorArr = []; // Define a temp error array to push the messages in
  //     for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
  //         errorArr.push(errorResponse[key].message)
  //     }
  //     // Set Errors
  //     setErrors(errorArr);
  // })      
  // }

  return (
    <div>
      <h1>Register to Join Us</h1>
      <form onSubmit={register}>
      {/* { errors && errors.map((err, index) => <p key={index}>{err}</p>)} */}
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

export default Register