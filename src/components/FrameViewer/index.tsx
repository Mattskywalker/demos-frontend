import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import './styles.css';
import { useFrames } from 'hooks/useFrame';
import { Frame } from 'services/DemoService';
import { useLoader } from 'hooks/useLoader';
import FullScreen from 'assets/FullScreen';

interface ModalData {
  title: string;
  text: string;
}
interface DemoEvents {
  selectors: string;
  event: keyof GlobalEventHandlersEventMap;
  modal: ModalData;
}

const demoEventList: DemoEvents[] = [
  {
    selectors: '[data-testid="welcome-login-button"]',
    event: 'click',
    modal: {
      title: 'Vamos começar? ▶️',
      text: 'Clique aqui para fazer login e inicie sua demonstração no ChatGPT. Basta ir clicando nos pontos indicados ao longo da jornada.',
    },
  },
  {
    selectors: '[id="email-input"]',
    event: 'input',
    modal: {
      title: 'Digite seu email 👤',
      text: 'Clique no campo email e digite.',
    },
  },
  {
    selectors: '[class="continue-btn"]',
    event: 'click',
    modal: {
      title: 'Clique em continuar ▶️',
      text: 'Clique no campo senha e digite.',
    },
  },
  {
    selectors: '[id="password"]',
    event: 'input',
    modal: {
      title: 'Digite sua senha 🔑',
      text: 'Clique no campo senha e digite.',
    },
  },
  {
    selectors: '[type="submit"]',
    event: 'click',
    modal: {
      title: 'Clique em continuar ▶️',
      text: 'Clique no botão continuar para fazer Login',
    },
  },
  {
    selectors: '[role="presentation"]',
    event: 'click',
    modal: {
      title: 'Bem vindo a tela inicial 🎇',
      text: 'E esse foi o fluxo de login',
    },
  },
];

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

      const event = demoEventList[index];

      const element = iframeDocument.querySelector<HTMLButtonElement>(
        event.selectors
      );

      if (!element) return;

      index < frames.length &&
        element?.addEventListener(event.event, handleNextFrame);

      const rect = element?.getBoundingClientRect();

      TooltipRef.current.innerHTML = `
        <h2>
          <strong>${event.modal.title}</strong>
        </h2>
        <p>${event.modal.text}</p>
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

  const handleOverlayClick = (frame: Frame) => () => {
    setIndex(frame.order);
  };

  const handleFullScreen = () => {
    if (!iframeRef.current) return;
    if (!iframeRef.current.requestFullscreen) return;
    iframeRef.current.requestFullscreen();
  };

  const [openTooltip, setOpenTooltip] = useState(false);

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
            style={{ visibility: openTooltip ? 'visible' : 'hidden' }}
            className="tooltip"
          />

          {!openTooltip && (
            <span className="start-modal-overlay">
              <article>
                <h2>Seja bem-vindo!</h2>
                <p>
                  {`Veja aqui uma demonstração do ${selectedDemo?.name} desenvolvida por uma pessoa que quer ser Getdemo.`}
                </p>
                <button onClick={() => setOpenTooltip(true)}>
                  Iniciar agora 🚀
                </button>
              </article>
            </span>
          )}
          <span
            onClick={() => {
              handleFullScreen();
            }}
            className="fullscreen"
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
