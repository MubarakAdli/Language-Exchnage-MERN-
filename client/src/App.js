
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;