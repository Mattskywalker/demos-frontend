import React from 'react';
import { Demo } from 'services/DemoService';

interface ButtonData {
  label: string;
  callback(): void;
}

interface DemoInfoProps {
  demo: Demo;
  buttonDataList: ButtonData[];
}

const DemoInfo = ({ demo, buttonDataList }: DemoInfoProps) => {
  return (
    <div className="demo-info">
      <h1>{demo?.name}</h1>
      <h2>
        {demo?.createdAt && new Date(demo?.createdAt).toLocaleDateString()}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          paddingTop: '1.8rem',
        }}
      >
        {buttonDataList.map(({ callback, label }) => (
          <button style={{ width: '100%' }} onClick={callback}>
            <h2>{label}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoInfo;
