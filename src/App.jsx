import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import Navbar from './layouts/navbar';
import ErrorPage from './pages/error/error';
import SignUp from './pages/auth/partials/signUp';
import SignIn from './pages/auth/partials/signIn';
import CodeVerification from './pages/auth/partials/codeVerification';
import CreatePassword from './pages/auth/partials/createPassword';
import AdminDashboard from './pages/admin/partials/adminDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/code-verification" element={<CodeVerification />} />
        <Route path="/auth/create-password" element={<CreatePassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
