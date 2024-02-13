// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/registration';
import LandingPage from './components/landingPage';
import AddDocument from './components/AddDoc';
import TakeExamPage from './components/TakeExam';
import Profile from  "./components/Profile";
import EditProfile from  "./components/EditProfile";
import UploadProfilePicture from './components/UploadProfilePicture';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/adddoc" element={<AddDocument/>} />
        <Route exact path="/exam" element={<TakeExamPage/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/editprofile" element={<EditProfile/>} />
        <Route exact path="/uploadprofilepicture" element={<UploadProfilePicture/>} />
      </Routes>
    </Router>
  );
}

export default App;
