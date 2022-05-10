import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get(
                "http://localhost:8000/api/users/loggedin",{ withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                setLoggedInUser(res.data);
                setLoaded(true);})

            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <>
            {loaded &&
                (Object.keys(loggedInUser).length !== 0 ? (
                    children
                ) : (
                    <Navigate to="/" />
                ))}
        </>
    );
};

export default AdminRoute;