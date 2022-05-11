import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams,useInRouterContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../App.css';
import DeleteBut from './DeleteBut';

const Dashboard = () => {

    const [loggedinuser, setloggedinuser] = useState({})
    const [rooms, setRooms] = useState([])
    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams();







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
            .then(res => { setRooms(res.data); console.log(res.data) })
            .catch(err => console.log(err))
    }, [])

    // const deleteroom = (roomId) => {
    //     // e.preventDefault();
    //     axios.delete('http://localhost:8000/api/delete/' + roomId)
    //         .then(res => { navigate("/dashboard") })
    //         .catch(err => console.log(err))
    // }
    const removeFromDom = RoomId => {
        setRooms(rooms.filter(myroom => myroom._id !==RoomId));
    }
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
return(
        <>
            <div>
                    <>
                        <nav className="navbar navbar-light bg-light justify-content-around">
                            <h4  >Welcome {loggedinuser.firstName} {loggedinuser.lastName}</h4>
                            <div className='d-flex justify-content'>
                                <button className="btn btn-outline-secondary me-5" type="button">
                                    <a className="text-dark text-decoration-none " href='/profile' >Profile</a></button>
                                <button onClick={logout} className="text-dark btn btn-sm btn-outline-secondary ml-3 " type="button">Logout</button>
                                {loggedinuser.admin ? <button className="text-dark btn btn-outline-secondary ml-3" type="button">
                                    <a className="text-dark text-decoration-none " href='/Addin' >Add Room</a></button> : ""}
                            </div>
                        </nav>

                        <div className="form-bg container-fluid d-flex flex-wrap  justify-content-evenly  ">
                            {loggedinuser.admin ? <>
                                {rooms ? rooms.map((filteredroom, inx) => (
                                    <>
                                        <div className="card mt-5 ml-5 w-100 col-3  " >
                                            <div className="card-body">
                                                <h5 className="card-title">Room {inx + 1}</h5>
                                                <p className="card-text">{filteredroom.lang1} to {filteredroom.lang2}</p>
                                                <p className="card-text">{filteredroom.desc}</p>
                                                {loggedinuser.admin ?  <DeleteBut roomId={filteredroom._id} successCallback={()=>removeFromDom(filteredroom._id)}/>
                                                     : <a href="#" className="btn btn-primary">Join Chat</a>}
                                            </div>
                                        </div>
                                    </>
                                )) : null}</> : <>
                                {rooms ? rooms.filter(room => room.lang1 == loggedinuser.nativeLang || room.lang2 == loggedinuser.nativeLang).map((filteredroom, inx) => (
                                    <>
                                    
                                    <div className="card mt-5 ml-5 w-100 col-3  " >
                                            <div className="card-body ">
                                                <h5 className="card-title">Room {inx + 1}</h5>
                                                <p className="card-text">{filteredroom.lang1} to {filteredroom.lang2}</p>
                                                <p className="card-text">{filteredroom.desc}</p>
                                                {loggedinuser.admin ? <DeleteBut roomId={filteredroom._id} successCallback={()=>removeFromDom(filteredroom._id)}/>
                                                     : <button onClick={() => handleChat(filteredroom._id)}
 className="btn btn-primary">Join Chat</button>}
                                            </div>
                                        </div>
                                    </>
                                )) : null}</>}
                        </div>
                    </>
                    :
                    <p></p>
                
            </div>
        </>
    );
};export default Dashboard;