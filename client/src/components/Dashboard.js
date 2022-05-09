import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [loggedinuser, setloggedinuser] = useState(null)
    const [rooms,setRooms] = useState([])
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
    useEffect(() => {
        axios.get('http://localhost:8000/api/rooms')
        .then(res => {setRooms(res.data);console.log(res.data)})
        .catch(err => console.log(err))
    },[])

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
        <>
        <div>
            {loggedinuser?
            <>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <button className="btn btn-outline-success" type="button">Main button</button>
                <p>Welcome {loggedinuser.firstName}</p>
                <button className="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
            </nav>
            <div>
                {rooms ? rooms.map((room,inx)=>(
                    <p>{room.lang1}</p>
                )) : null}
            </div>
            </>
            :
            <p></p>
            }
           
        </div>
        </>
    );
};


export default Dashboard;