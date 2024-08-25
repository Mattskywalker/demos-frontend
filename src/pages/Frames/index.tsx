import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DemoService, { Frame } from 'services/DemoService';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import Page from 'components/Page';
import FrameSelector from 'components/FrameSelector';
import FrameViewer from 'components/FrameViewer';
import { toast } from 'react-toastify';
import { useLoader } from 'hooks/useLoader';

const demoService = new DemoService();

const Frames = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { demoid } = useParams();
  const { setFrames, setSelectedDemo, selectedDemo, frames } = useFrames();
  const { disableLoading, enabelLoading, loading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      if (!demoid) return;
      if (!selectedDemo) {
        const data = await demoService.getDemo(demoid);
        data && setSelectedDemo(data);
      }
      enabelLoading();
      const data = await demoService.getDemoFrames(demoid);
      setFrames(data);
      disableLoading();
    };

    fetchData();
  }, [demoid]);

  const handleNavigateEdit = () => {
    navigate(`${pathname}/edit`);
  };

  return (
    <Page
      title="Demo > FrameList"
      breadCrumbs={{
        path: ['demos', `${selectedDemo?.name}`],
        backTo: '/demo',
      }}
    >
      <div className="page-container">
        <div className="demo-info">
          <h1>{selectedDemo?.name}</h1>
          <h2>
            {selectedDemo?.createdAt &&
              new Date(selectedDemo?.createdAt).toLocaleDateString()}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              paddingTop: '1.8rem',
            }}
          >
            <button style={{ width: '100%' }} onClick={handleNavigateEdit}>
              <h2>Editar</h2>
            </button>
          </div>
        </div>
        <FrameViewer />
      </div>
    </Page>
  );
};

export default Frames;
