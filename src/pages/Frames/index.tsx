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
import DemoInfo from 'components/DemoInfo';

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
        {selectedDemo && (
          <DemoInfo
            demo={selectedDemo}
            buttonDataList={[
              {
                label: 'Editar',
                callback: handleNavigateEdit,
              },
            ]}
          />
        )}
        <FrameViewer />
      </div>
    </Page>
  );
};

export default Frames;
