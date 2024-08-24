import React, { useEffect, useRef, useState } from 'react';

import './styles.css';
import { useFrames } from 'hooks/useFrame';

const FrameViewer = () => {
  const { setFrames, setSelectedDemo, selectedDemo, frames } = useFrames();

  const [index, setIndex] = useState(0);
  const currentFrame = frames[index];

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const disableTextSelection = (iframeDocument: Document) => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
    `;
    iframeDocument.head.appendChild(style);
  };

  const enableEditing = () => {
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) return;

    disableTextSelection(iframeDocument);
    iframeDocument.addEventListener('dblclick', () => {
      iframeDocument.designMode = 'on';

      const styles = iframeDocument.head.querySelectorAll('style');
      styles.forEach((style) => {
        if (style.textContent?.includes('user-select: none')) {
          style.remove();
        }
      });
    });
  };

  const handleNextFrame = () => {
    setIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex > frames.length - 1) {
        return prev;
      }

      return newIndex;
    });
  };

  const handlePrevFrame = () => {
    setIndex((prev) => {
      const newIndex = prev - 1;

      if (newIndex < 0) {
        return prev;
      }

      return newIndex;
    });
  };

  return (
    <div className="frame-viewer">
      <iframe
        className="iframe-component"
        onChange={() => console.log('changes')}
        onLoad={enableEditing}
        ref={iframeRef}
        height={'100%'}
        srcDoc={currentFrame?.html}
      />
      <div className="frame-selector">
        <button onClick={handlePrevFrame}>{'<'}</button>
        <h2>{index + 1}</h2>
        <button onClick={handleNextFrame}>{'>'}</button>
      </div>
    </div>
  );
};

export default FrameViewer;
