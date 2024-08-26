import React from 'react';

import './styles.css';

interface StartModalProps {
  isOpen: boolean;
  onStart(): void;
  demoName: string;
}

const StartModal = ({ isOpen, demoName, onStart }: StartModalProps) => {
  return (
    <span
      className="start-modal-overlay"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <article>
        <h2>Seja bem-vindo!</h2>
        <p>
          {`Veja aqui uma demonstração do ${demoName} desenvolvida por uma pessoa que quer ser Getdemo.`}
        </p>
        <button onClick={onStart}>Iniciar agora 🚀</button>
      </article>
    </span>
  );
};

export default StartModal;
