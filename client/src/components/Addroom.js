import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Addroom= () => {
    const [formInfo, setFormInfo] = useState({
        firstLang:"",
        secondLang:"",
        desc:""
    })

    const [errors, setErrors] = useState({

    })

    let navigate = useNavigate();

    const changehandler= (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const adding = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/addroom', formInfo, {withCredentials:true})
            .then(res=>{
                console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    navigate("/dashboard")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }


    return (
        <div>
            <h1>Register</h1>
            <form onSubmit= {adding}>
                <div className="form-group">
                    <label>First language </label>
                    <input type="text" className="form-control" name="lang1" onChange= {changehandler} />
                    {errors.username? <p className="text-danger">{errors.firstName.message}</p>: ""}
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lang2" onChange= {changehandler} />
                    {errors.username? <p className="text-danger">{errors.lastName.message}</p>: ""}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="desc" onChange= {changehandler}/>
                    {errors.email? <p className="text-danger">{errors.email.message}</p>: ""}
                </div>
                
                <input type="submit" value="Register" className="btn btn-success" />

            </form>
        </div>
    );
};


export default Addroom;