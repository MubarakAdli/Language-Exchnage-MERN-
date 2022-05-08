import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, {useState} from 'react';

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
            <h1>Login</h1>
            <form onSubmit= {login}>
                {errormsg? <p className="text-danger">{errormsg}</p>: ""}
                
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange= {changehandler}/>
                    {/* {errors.email? <p className="text-danger">{errors.email.message}</p>: ""} */}
                    </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange= {changehandler}/>
                    {/* {errors.password? <p className="text-danger">{errors.password.message}</p>: ""} */}
                    </div>
                
                <input type="submit" value="Login" className="btn btn-success" />

            </form>
        </div>
    );
};



export default Login;