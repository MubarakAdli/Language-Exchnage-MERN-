import React from 'react'
import axios from 'axios';
    
export default props => {
    
    
    const {roomId,successCallback}=props;
    const deleteroom = (e) => {
        axios.delete('http://localhost:8000/api/delete/' + roomId)
            .then(res=>{
                successCallback();
            })
    }
    
    return (
        <button className="text-white btn btn-danger btn-outline-danger "  onClick={deleteroom}>
            Delete
        </button>
    )
}