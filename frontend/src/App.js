// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import Home from './pages/Home.jsx';
import TopicPage from './pages/Topic.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ChangePassword from './pages/changePassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
