import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
 import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore';
const App = () => {

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  const {theme}=useThemeStore();

  useEffect(()=>{

    checkAuth();

  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth&& !authUser)
  

    return(
    <div className ="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>

    </div>

    )
  

  return (
   

  <div data-theme="retro">

    <Navbar/>

    <Routes>
      <Route path="/" element={authUser ? <HomePage/>:<Navigate to="/login"/> } />

      <Route path="/signup" element={!authUser ?<SignUpPage/>:<Navigate to="/"/>} />

      <Route path="/profile" element={authUser ?<ProfilePage/>:<Navigate to="/login"/>} />

      <Route path="/login" element={!authUser ?<LoginPage/>:<Navigate to="/"/>} />

      <Route path="/settings" element={<SettingsPage/>} />
      

    </Routes>


<Toaster/>

  </div>

   
  )
}

export default App
