import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddUpdateEmployeeComponent from './components/AddUpdateEmployeeComponent';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <Router>
        {/* <HeaderComponent /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<AddUpdateEmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<AddUpdateEmployeeComponent />} />
            <Route path="/signup" element={<Signup />} /> {/* Add signup route */}
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;