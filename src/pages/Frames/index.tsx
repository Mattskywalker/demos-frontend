import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DemoService, { Frame } from 'services/DemoService';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import Page from 'components/Page';
import FrameSelector from 'components/FrameSelector';
import FrameViewer from 'components/FrameViewer';

const demoService = new DemoService();

const Frames = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { demoid } = useParams();
  const { setFrames, setSelectedDemo, selectedDemo, frames } = useFrames();

  useEffect(() => {
    const fetchData = async () => {
      if (!demoid) return;
      if (!selectedDemo) {
        const data = await demoService.getDemo(demoid);
        data && setSelectedDemo(data);
      }
      const data = await demoService.getDemoFrames(demoid);

      console.log('data', data);
      setFrames(data);
    };

    fetchData();
  }, [demoid]);

  const [editedFrame, setEditedFrame] = useState<Frame | null>(null);

  const handleSave = useCallback(async () => {
    if (!editedFrame) return;

    const response = await demoService.saveFrame(editedFrame);
  }, [editedFrame]);

  const handleFrameViewerChange = (frame: Frame) => {
    setEditedFrame(frame);
  };

  return (
    <Page title="Demo > FrameList">
      <div className="page-container">
        <div className="demo-info">
          <h1>{selectedDemo?.name}</h1>
          <h2>
            {selectedDemo?.createdAt &&
              new Date(selectedDemo?.createdAt).toLocaleDateString()}
          </h2>

          <button
            style={{
              transition: 'all 200ms linear',
              visibility: !editedFrame ? 'hidden' : 'visible',
            }}
            onClick={() => handleSave()}
          >
            <h2>Salvar</h2>
          </button>
        </div>
        {/* <div className="frame-list">
          {frames.map((data) => (
            <article key={data.id} className="card">
              <iframe srcDoc={data.html} />
              <span onClick={handleEditOverlay(data.id)} className="overlay" />
            </article>
          ))}
        </div> */}
        <FrameViewer onChange={handleFrameViewerChange} />
        {/* <div>
          {' '}
          {frames.map((data) => (
            <article key={data.id} className="card">
              <iframe srcDoc={data.html} />
              <span onClick={handleEditOverlay(data.id)} className="overlay" />
            </article>
          ))}
        </div> */}
      </div>
    </Page>
  );
};

export default Frames;
