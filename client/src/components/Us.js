import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams,useInRouterContext } from "react-router-dom";
import { Link } from 'react-router-dom';



export const Us = () => {
  const [loggedinuser, setloggedinuser] = useState({})
  const [rooms, setRooms] = useState([])
  let navigate = useNavigate();
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams();
  
  
  
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
    return (
      <div  className='form-bg'>
                              <nav className="navbar navbar-light bg-light justify-content-around">
                            <h4  >Welcome {loggedinuser.firstName} {loggedinuser.lastName}</h4>
                            <button className="btn btn-outline-secondary me-5" type="button">
                                    <a className="text-dark text-decoration-none " href='/dashboard' >Dashboard</a></button>

                            <div className='d-flex justify-content'>
                                <button className="btn btn-outline-secondary me-5" type="button">
                                    <a className="text-dark text-decoration-none " href='/profile' >Profile</a></button>
                                <button onClick={logout} className="text-dark btn btn-sm btn-outline-secondary ml-3 " type="button">Logout</button>
                                {loggedinuser.admin ? <button className="text-dark btn btn-outline-secondary ml-3" type="button">
                                    <a className="text-dark text-decoration-none " href='/Addin' >Add Room</a></button> : ""
                                    }

                            </div>
                        </nav>

    <div data-home-page="Home.html" data-home-page-title="Home" className="u-body u-xl-mode"><header className="u-clearfix u-header u-header" id="sec-6292"><div className="u-align-left u-clearfix u-sheet u-sheet-1"></div></header>
    <section className="u-align-left u-clearfix u-section-1" id="carousel_cf7e">
      <div className="u-clearfix u-sheet u-valign-bottom-md u-valign-bottom-sm u-valign-bottom-xs u-sheet-1">
        <blockquote className="u-border-20 u-border-palette-4-base u-custom-font u-font-montserrat u-text u-text-default u-text-1">About Us</blockquote>
        <p className="u-custom-font u-font-montserrat u-text u-text-2">In this website we aim to connect people from different caltural background in order to exchange language in addition to culture<br></br>
          <br></br>
          <br></br>
          <span>This is totally a free website, which was done by bootcamp students:</span>
          <br></br>
          <br></br>

        </p>
        <ul className="u-text u-text-3">
          <li>Hassan Odeh</li>
          <li>MaherAbdelkareem</li>
          <li>Jehad Issa</li>
          <li>Mubarak Mubarak</li>
        </ul>
      </div>
    </section>
    
    
  </div>
  </div>
  )
}

export default Us