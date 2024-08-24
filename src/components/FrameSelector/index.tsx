import React from 'react';
import { Frame } from 'services/DemoService';

interface FrameSelectorProps {
  frameList: Frame[];
}

const FrameSelector = ({ frameList }: FrameSelectorProps) => {
  return (
    <select name="select">
      {frameList.map((data) => (
        <option>
          <iframe height={'100px'} srcDoc={data.html} />
        </option>
      ))}
    </select>
  );
};

export default FrameSelector;
