import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Addin from './components/Addin';
import Edit from './components/Edit';

import React from 'react';
// import AdminRoute from './components/AdminRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/Addin" element={<AdminRoute />} /> */}
      <Route path="/Addin" element={<Addin />}></Route>
      <Route path="/Edit" element={<Edit />}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
