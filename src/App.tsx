import { useEffect, useState } from 'react';
import './App.css';
import { Router } from '../src/router';

function App() {
  // const [demos, setDemos] = useState<Demo[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:3001/demos', {
  //       method: 'GET',
  //     });

  //     const data = await response.json();
  //     setDemos([...data, ...data, ...data, ...data, ...data, ...data]);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
