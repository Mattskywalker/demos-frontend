import React, { useCallback, useMemo, useRef, useState } from 'react';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import { Frame } from 'services/DemoService';
import { useLoader } from 'hooks/useLoader';
import StartModal from './components/StartModal';
import FrameListSelector from '../FrameListSelector';

interface FrameViewerProps {
  onChange?(frame: Frame | null): void;
}

const FrameViewer = ({ onChange }: FrameViewerProps) => {
  const { frames, selectedDemo } = useFrames();
  const { loading } = useLoader();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const TooltipRef = useRef<HTMLSpanElement>(null);

  const [index, setIndex] = useState(0);

  const currentFrame = useMemo(() => frames[index], [index, frames]);

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

  const handleNextFrame = useCallback(() => {
    setIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex > frames.length - 1) {
        return prev;
      }

      return newIndex;
    });
  }, [frames]);

  const handlePrevFrame = () => {
    setIndex((prev) => {
      const newIndex = prev - 1;

      if (newIndex < 0) {
        return prev;
      }

      return newIndex;
    });
  };

  const handleLoadEvents = useCallback(
    (iframeDocument: Document) => {
      if (!TooltipRef.current) return;

      const event = currentFrame.event;

      const element = iframeDocument.querySelector<HTMLButtonElement>(
        event.selectors
      );

      if (!element) return;

      index < frames.length &&
        element?.addEventListener(event.event, handleNextFrame);

      const rect = element?.getBoundingClientRect();

      TooltipRef.current.innerHTML = `
        <h2>
          <strong>${event.title}</strong>
        </h2>
        <p>${event.text}</p>
      `;

      const buttonCenterY = rect.top + rect.height / 2;

      const tooltipWidth = TooltipRef.current.offsetWidth;
      const tooltipHeight = TooltipRef.current.offsetHeight;

      const tooltipLeft = rect.left - tooltipWidth;
      const tooltipTop = buttonCenterY - tooltipHeight / 2;

      TooltipRef.current.style.top = `${tooltipTop}px`;
      TooltipRef.current.style.left = `${tooltipLeft - 30}px`;
    },
    [
      index,
      TooltipRef.current,
      iframeRef.current,
      iframeRef.current?.contentDocument,
      frames,
    ]
  );

  const onIframeLoad = () => {
    if (!iframeRef.current) return;
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) return;

    handleLoadEvents(iframeDocument);

    disableTextSelection(iframeDocument);

    iframeDocument.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  };

  const handleOverlayClick = (frame: Frame) => {
    setIndex(frame.order);
  };

  const handleFullScreen = () => {
    if (!iframeRef.current) return;
    if (!iframeRef.current.requestFullscreen) return;
    iframeRef.current.requestFullscreen();
  };

  const [demoStarted, setDemoStarted] = useState(false);

  if (loading) {
    return <></>;
  }

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
          <span
            ref={TooltipRef}
            style={{ visibility: demoStarted ? 'visible' : 'hidden' }}
            className="tooltip"
          />

          <StartModal
            demoName={selectedDemo?.name || ''}
            isOpen={!demoStarted}
            onStart={() => setDemoStarted(true)}
          />
        </div>
        <FrameListSelector
          frameIndex={index}
          frameList={frames}
          onSelect={handleOverlayClick}
        />
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
