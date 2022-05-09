import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [loggedinuser, setloggedinuser] = useState(null)
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials:true})
            .then(res=>{
                console.log(res)
                setloggedinuser(res.data.user)
            })
            .catch(err=>{
                console.log("errrrrrrr",err)
                navigate("/")
            })
    }, [])


    const logout = (e)=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                console.log(res)
                navigate("/")
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        
        <div>
            
            {loggedinuser? 
            <nav class="navbar navbar-light bg-light justify-content-between">
            
              <button class="btn btn-outline-success" type="button">Main button</button>
              <button class="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
            
          </nav>
            
            
            
            
            
            :
            <h1>Please log in first</h1>}
            
        </div>
    
    );
};


export default Dashboard;