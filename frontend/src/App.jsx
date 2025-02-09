import React from 'react';

import Navbar from './components/Navbar';
 import { Routes,Route } from 'react-router-dom';
const App = () => {
  return (
    <>

  <div>

    <Navbar/>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/singup" element={<SignUpPage/>} />
      <Route path="/" element={<ProfilePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/" element={<SettingsPage/>} />
      





    </Routes>


  </div>

    </>
  )
}

export default App