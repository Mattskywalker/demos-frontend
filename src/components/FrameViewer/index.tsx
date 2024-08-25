import React, { useCallback, useEffect, useRef, useState } from 'react';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import { Frame } from 'services/DemoService';

interface FrameViewerProps {
  onChange?(frame: Frame | null): void;
}

const FrameViewer = ({ onChange }: FrameViewerProps) => {
  const { frames } = useFrames();

  const [index, setIndex] = useState(0);
  const currentFrame = frames[index];

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const clearChanges = () => onChange && onChange(null);

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

  const onIframeLoad = () => {
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) return;

    disableTextSelection(iframeDocument);

    iframeDocument
      .querySelector<HTMLButtonElement>('[data-testid="welcome-login-button"]')
      ?.addEventListener('click', () => {
        handleNextFrame();
      });

    iframeDocument
      .querySelector<HTMLInputElement>('[id="email-input"]')
      ?.addEventListener('input', () => {
        handleNextFrame();
      });

    iframeDocument
      .querySelector<HTMLButtonElement>('[class="continue-btn"]')
      ?.addEventListener('click', () => {
        handleNextFrame();
      });

    iframeDocument
      .querySelector<HTMLInputElement>('[id="password"]')
      ?.addEventListener('input', () => {
        handleNextFrame();
      });

    iframeDocument
      .querySelector<HTMLButtonElement>('[type="submit"]')
      ?.addEventListener('click', () => {
        handleNextFrame();
      });

    iframeDocument.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
      }

      console.log(e.target);
    });
  };

  const handleNextFrame = () => {
    setIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex > frames.length - 1) {
        return prev;
      }

      clearChanges();
      return newIndex;
    });
  };

  const handlePrevFrame = () => {
    setIndex((prev) => {
      const newIndex = prev - 1;

      if (newIndex < 0) {
        return prev;
      }

      clearChanges();
      return newIndex;
    });
  };

  const handleOverlayClick = (frame: Frame) => () => {
    clearChanges();
    setIndex(frame.order);
  };

  return (
    <div className="wrapper">
      <div className="frame-container">
        <div className="frame-viewer">
          <iframe
            className="iframe-component"
            onLoad={onIframeLoad}
            ref={iframeRef}
            height={'100%'}
            srcDoc={currentFrame?.html}
          />
        </div>
        <div className="frame-list">
          {frames?.map((data) => (
            <article
              style={{
                backgroundColor:
                  index === data.order ? '#646cff' : 'transparent',
              }}
              key={data.id}
              className="frame-card"
            >
              <iframe srcDoc={data.html} />
              <span onClick={handleOverlayClick(data)} className="overlay" />
            </article>
          ))}
        </div>
      </div>
      <div className="frame-selector">
        <button onClick={handlePrevFrame}>{'<'}</button>
        <h2>{(currentFrame?.order + 1).toString()}</h2>
        <button onClick={handleNextFrame}>{'>'}</button>
      </div>
    </div>
  );
};

export default FrameViewer;
