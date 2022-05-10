import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

    
const Edit = (props) => {
    const [loggedinuser, setloggedinuser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const[firstName , setFirstName]=useState("")
    const[lastName , setLastName]=useState("")
    const[nativeLang , setNativeLang]=useState("")
    const [errors, setErrors] = useState()



    
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                console.log(res)
                setFirstName(res.data.user.firstName)
                setLastName(res.data.user.lastName)
                setNativeLang(res.data.user.nativeLang)


                setLoaded(true)
            })
            .catch(err => {
                console.log("errrrrrrr", err)
                navigate("/")
            })
    }, [])

    let navigate = useNavigate();

    
    // const changehandler = (e)=>{
    //     setFormInfo({
    //         ...formInfo,
    //         [e.target.name]:e.target.value
    //     })
    // }

    const updatePerson = (e)=>{
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/loggedin', {firstName,lastName,nativeLang},{ withCredentials: true })
            .then(res=>{
                navigate("/profile");
            })
            .catch(err=>{
                console.log(err)
            })
    }

    
    return (
        <div>
            <h1>Edit Profile</h1>
            {loaded && 
            <form onSubmit={updatePerson}>
                <p>
                    <label>First Name:</label><br />
                    <input type="text" 
                    name="firstName"
                    value={firstName} 
                    onChange={e=> setFirstName(e.target.value)}
                    
                     />
                </p>
                <p>
                    <label>Last Name:</label><br />
                    <input type="text" 
                    name="lastName"
                    value={lastName}
                    onChange={e=> setLastName(e.target.value)}


                     />
                </p>
                <p>
                    <label>Native lang:</label><br />
                    <input type="text" 
                    name="nativeLang"
                    value={nativeLang}
                    onChange={e=> setNativeLang(e.target.value)}

                     />
                </p>
                <input type="submit" />
            </form>
            }
        </div>
    )
}
    
export default Edit;
