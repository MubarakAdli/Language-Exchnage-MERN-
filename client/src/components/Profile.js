import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const [loggedinuser, setloggedinuser] = useState(null)
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

    return (
        <>
            {loaded &&
                <div>

                    {loggedinuser ?
                        <><div>
                            <h1>Welcome {loggedinuser.firstName}</h1>
                            <button onClick={logout}>Logout</button>
                            {loggedinuser.admin ? <button>Add Room</button> : ''}
                        </div><div>
                                <p>
                                Name: {loggedinuser.firstName} {loggedinuser.lastName} 
                                </p>
                                <p>
                                Email :{loggedinuser.email}
                                </p>
                                <p>
                                    Native Language :{loggedinuser.nativeLang}
                                </p>
                            </div></>


                        :
                        <h1>Please log in first</h1>}

                </div>}

        </>


    );
};


export default Profile;