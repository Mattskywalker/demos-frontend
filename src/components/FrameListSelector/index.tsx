import React from 'react';
import { Frame } from 'services/DemoService';

import './styles.css';

interface FrameListSelectorProps {
  frameList: Frame[];
  frameIndex: number;
  onSelect(data: Frame): void;
}

const FrameListSelector = ({
  frameList,
  frameIndex,
  onSelect,
}: FrameListSelectorProps) => {
  return (
    <div className="frame-list">
      {frameList?.map((data) => (
        <article
          style={{
            backgroundColor:
              frameIndex === data.order ? '#646cff' : 'transparent',
          }}
          key={data.id}
          className="frame-card"
        >
          <iframe srcDoc={data.html} />
          <span onClick={() => onSelect(data)} className="overlay" />
        </article>
      ))}
    </div>
  );
};

export default FrameListSelector;
