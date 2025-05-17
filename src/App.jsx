import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import Navbar from './layouts/navbar';
import ErrorPage from './pages/error/error';

const App = () => {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/auth" element={<Auth />} /> */}
      </Routes>

    </>
  );
};

export default App;
