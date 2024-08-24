import { html } from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useFrames } from 'hooks/useFrame';
import React, { IframeHTMLAttributes, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DemoService from 'services/DemoService';
import prettier from 'prettier/standalone';
import { parsers } from 'prettier/plugins/html';
import './styles.css';

const demoService = new DemoService();

const EditFrame = () => {
  const { frameid } = useParams();
  const { frames, setFrames } = useFrames();

  const [currentFrame, setCurrentFrame] = useState(
    frames.find((data) => data.id === frameid)
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!frameid) return;

      const data = await demoService.getFrame(frameid);
      setCurrentFrame(data);
    };

    if (!frames.length) {
      fetchData();
    }
  }, [frameid]);

  if (!currentFrame) {
    return <></>;
  }

  return (
    <div className="editor-container">
      {/* <ReactCodeMirror
        height="650px"
        width="820px"
        style={{ fontSize: '18px' }}
        extensions={[html()]}
        value={formatedHtml}
        theme={dracula}
      /> */}
      <iframe
        style={{
          display: 'flex',
          height: '650px',
          fontSize: '24px',
        }}
        srcDoc={currentFrame.html}
      />
    </div>
  );
};

export default EditFrame;
