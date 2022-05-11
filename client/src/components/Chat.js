import '../App.css';
import io from "socket.io-client";
import { Link } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from 'axios'
import { useParams,useNavigate } from "react-router-dom";
import ReactScrollableFeed from 'react-scrollable-feed'


const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});




const Chat = ({}) => {
    const [loggedinuser, setloggedinuser] = useState([])
    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)
    const [username,setusername]=useState("")

    useEffect(() => {
        
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                console.log(res)
                setloggedinuser(res.data.user)
                setusername([...username,loggedinuser.firstName])

                setLoaded(true)
            })
            .catch(err => {
                console.log("errrrrrrr", err)
                navigate("/")
            })
    }, [])

  


        const[room,setroom]=useState({})
        const { id } = useParams();
    
        useEffect(() => {
            axios.get('http://localhost:8000/api/rooms/' +id)
                .then(res => setroom(res.data))
                .catch(err => console.error(err));
        }, [id]);


  



           console.log(username)
        
        








  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);

    });

    
    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);




  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
      <div className='form-bg' >
    <div className="container ">
      <div className="row">
        <div className="col-md-12 mt-4 mb-4">
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <h4 className='text-Dark'>Chat world wide!</h4>
          <div id="messages" >
          <ReactScrollableFeed>

            {messages.map(({ user, date, text }, index) => (
              <div key={index} className="row mb-2">
                <div className="col-md-3 chatMessages">
                                  {moment(date).format("h:mm:ss a")}

                </div>
                <div className="col-md-2">{user.name}</div>
                <div className="col-md-2">{text}</div>
              </div>
            ))}
            
            </ReactScrollableFeed>

          </div>
          <form onSubmit={submit} id="form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={e => setMessage(e.currentTarget.value)}
                value={message}
                id="text"
              />
              <span className="input-group-btn">
                <button id="submit" type="submit" className="btn btn-primary">
                  Send
                </button>
              </span>
            </div>
          </form>
       
        <div className='d-flex  flex-column'>

<button  className='btn btn-lg btn-secondary '>
<a href='/Dashboard' className='text-warning'>
Leave Room
</a>
</button>
 </div>
        </div>
    {/* <input value={loggedinuser.firstName} onClick={changehandle} >
                
    </input> */}
    </div>
    </div>
    </div>
  );
};

export default Chat;
