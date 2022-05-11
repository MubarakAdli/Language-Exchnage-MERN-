import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useInRouterContext, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const Dashboard = () => {

    const [loggedinuser, setloggedinuser] = useState(null)
    const [rooms,setRooms] = useState([])
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
    useEffect(() => {
        axios.get('http://localhost:8000/api/rooms')
        .then(res => {setRooms(res.data);console.log(res.data)})
        .catch(err => console.log(err))
    },[])

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
    
    const handleChat=(id)=>{
        navigate('/chat/'+id)
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
                {rooms ? rooms.filter(room => room.lang1 == loggedinuser.nativeLang || room.lang2 == loggedinuser.nativeLang).map((filteredroom,inx)=>(
                    <>
                    <div className='row'>
                        <div className='col-2'>
                    <div className="card mt-5 ml-5  " >
                        
                            <div className="card-body">
                                <h5 className="card-title">Room {inx+1}</h5>
                                <p className="card-text">{filteredroom.lang1} to {filteredroom.lang2}</p>
                                <button  onClick={()=>handleChat(filteredroom._id) }

                            className="btn btn-primary">Join Chat</button>
                            </div>
                        </div>
                        </div>
                        </div>
                        </>
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