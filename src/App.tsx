import { useEffect, useState } from 'react';
import './App.css';
import { Router } from '../src/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
