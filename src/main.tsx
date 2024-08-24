import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Note que você pode remover a extensão .tsx
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FrameProvider } from 'hooks/useFrame';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <FrameProvider>
          <App />
        </FrameProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
