import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Addin from './components/Addin';
import Edit from './components/Edit';
import Chatme from './components/Chatme';
import { createContext, useState, useEffect } from 'react'



import React from 'react';

export const UserContext = createContext()

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })



  return (
    <UserContext.Provider value={{ userData, setUserData }}>

    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Addin" element={<Addin />}></Route>
      <Route path="/Edit" element={<Edit />}></Route>
      <Route path="/chat/:id" element={<Chatme />}></Route>

      </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>

  );
  }

export default App;
