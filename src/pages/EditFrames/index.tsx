import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DemoService, { Frame } from 'services/DemoService';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import Page from 'components/Page';
import FrameSelector from 'components/FrameSelector';
import FrameViewer from 'components/FrameViewer';
import FrameEditor from 'components/FrameEditor';
import { useLoader } from 'hooks/useLoader';
import { toast } from 'react-toastify';

const demoService = new DemoService();

const EditFrames = () => {
  const navigate = useNavigate();
  const { disableLoading, enabelLoading, loading } = useLoader();
  const { pathname } = useLocation();
  const { demoid } = useParams();
  const { setFrames, setSelectedDemo, selectedDemo, frames } = useFrames();

  const fetchData = useCallback(async () => {
    if (!demoid) return;
    if (!selectedDemo) {
      const data = await demoService.getDemo(demoid);
      data && setSelectedDemo(data);
    }
    const data = await demoService.getDemoFrames(demoid);

    setFrames(data);
  }, [demoid, selectedDemo]);

  useEffect(() => {
    fetchData();
  }, [demoid]);

  const [editedFrame, setEditedFrame] = useState<Frame | null>(null);

  const handleSave = useCallback(async () => {
    if (!editedFrame) return;
    enabelLoading();

    await demoService
      .saveFrame(editedFrame)
      .then(() => {
        toast(
          `Aletrações de frame ${editedFrame.order + 1} de ${selectedDemo?.name}, salvas com sucesso!`,
          {
            type: 'success',
            position: 'top-left',
            style: {
              fontSize: '14px',
            },
          }
        );
        fetchData();
      })
      .catch(() => {
        toast(`Não foi possivel salvar alterações.`, {
          type: 'error',
          position: 'top-left',
          style: {
            fontSize: '14px',
          },
        });
      })
      .finally(() => {
        disableLoading();
      });
  }, [editedFrame]);

  const handleFrameViewerChange = (frame: Frame) => {
    setEditedFrame(frame);
  };

  return (
    <Page
      title="Demo > FrameList"
      breadCrumbs={{
        path: ['demos', `${selectedDemo?.name}`, 'editar'],
        backTo: pathname.replace('/edit', ''),
      }}
    >
      <div className="page-container">
        <div className="demo-info">
          <h2>Editando ✏️: </h2>
          <br />
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
            <button
              style={{
                transition: 'all 200ms linear',

                width: '100%',
              }}
              disabled={!editedFrame}
              onClick={() => handleSave()}
            >
              <h2>Salvar</h2>
            </button>
          </div>
        </div>
        <FrameEditor canEdit onChange={handleFrameViewerChange} />
      </div>
    </Page>
  );
};

export default EditFrames;
