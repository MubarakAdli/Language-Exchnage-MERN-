import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Login = () => {

    const [formInfo, setFormInfo] = useState({
        email:"",
        password: ""
    })

    const [errormsg, seterrormsg] = useState(null);

    let navigate = useNavigate();


    const changehandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const login = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", formInfo, {withCredentials:true})
            .then(res=>{
                console.log(res)
                if(res.data.msg== "success!"){
                    navigate("/dashboard")
                }else{
                    seterrormsg(res.data.msg)
                }
            })
            .catch(err=> console.log(err))
    }



    return (
        <div>
            <div className="demo form-bg-3">
                <div className="container-fluid" >
                    <div className="row  " >
                        <div className="margin ">
                            <div className="col-md col-md">
            <h1>Login</h1>
            <form onSubmit= {login}>
                {errormsg? <p className="text-danger">{errormsg}</p>: ""}
                
                
                
                <TextField className="mb-3 " id="standard-basic" label="Email" name="email"    onChange={changehandler} variant="standard" />
                    {/* {errors.email? <p className="text-danger">{errors.email.message}</p>: ""} */}
                    
                    <TextField className="mb-3 " type="password" id="standard-basic" label="Password" name="password"    onChange={changehandler} variant="standard" />
                    {/* {errors.password? <p className="text-danger">{errors.password.message}</p>: ""} */}
                    
                
                    <Box sx={{ '& button': { m: 1 } }}>
                            <Button variant="contained"  type="submit">
                                Login
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



export default Login;