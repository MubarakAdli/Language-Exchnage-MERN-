import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

    
const Update = (props) => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nativeLang, setNativelang] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/loggedin') 
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                setNativelang(res.data.nativeLang);



            })
    }, []);
    
    const updatePerson = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/loggedin', {
            firstName,
            lastName,
            email,
            nativeLang
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }
    
    return (
        <div>
            <h1>Update a Person</h1>
            <form onSubmit={updatePerson}>
                <p>
                    <label>First Name</label><br />
                    <input type="text" 
                    name="firstName" 
                    value={firstName} 
                    onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text" 
                    name="lastName"
                    value={lastName} 
                    onChange={(e) => { setLastName(e.target.value) }} />
                </p>
                <p>
                    <label>Email</label><br />
                    <input type="text" 
                    name="email"
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value) }} />
                </p>
                <p>
                    <label>Native lang</label><br />
                    <input type="text" 
                    name="nativeLang"
                    value={nativeLang} 
                    onChange={(e) => { setNativelang(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}
    
export default Update;
