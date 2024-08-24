import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import DemoService, { Demo } from 'services/DemoService';

import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useFrames } from 'hooks/useFrame';

const demoService = new DemoService();

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedDemo } = useFrames();
  const [demos, setDemos] = useState<Demo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await demoService.getAllDemos();
      setDemos([...data, ...data, ...data, ...data, ...data, ...data]);
    };
    fetchData();
  }, []);

  const handleDemoVisualization = (demo: Demo) => () => {
    setSelectedDemo(demo);
    navigate(`/demo/${demo.id}`);
  };

  return (
    <Page title="Home">
      <div
        className="home-grid"
        style={{
          width: '100%',
          height: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {demos &&
          demos.map((demo, index) => (
            <article key={demo.id + index} className="home-card">
              <h2>{demo.name}</h2>
              <button onClick={handleDemoVisualization(demo)}>
                Visualizar
              </button>
            </article>
          ))}
      </div>
    </Page>
  );
};

export default Home;
