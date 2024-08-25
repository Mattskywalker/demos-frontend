import React, { useCallback, useEffect, useRef, useState } from 'react';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import { Frame } from 'services/DemoService';

interface FrameViewerProps {
  onChange?(frame: Frame | null): void;
  canEdit?: boolean;
}

const FrameEditor = ({ onChange, canEdit = false }: FrameViewerProps) => {
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

  const [isEditing, setIsEditing] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const save = useCallback(() => {
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) return;

    setHasTyped(true);

    onChange &&
      onChange({
        ...currentFrame,
        html: `${iframeDocument.documentElement.outerHTML}`,
      });
  }, [iframeRef.current, currentFrame]);

  const enableEditing = () => {
    if (!canEdit) return;
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) return;

    disableTextSelection(iframeDocument);

    iframeDocument.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === '') {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    iframeDocument.addEventListener('dblclick', () => {
      iframeDocument.designMode = 'on';
      setIsEditing(true);
      iframeDocument.addEventListener('input', save);
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
            onLoad={enableEditing}
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

export default FrameEditor;
