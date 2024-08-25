import React from 'react';
import { IconProps } from './IconProps';

const FullScreen = ({ size = '32px' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 15.75V19.5H15.75M8.25 19.5H4.5V15.75M15.75 4.5H19.5V8.25M4.5 8.25V4.5H8.25"
        stroke="#131D43"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FullScreen;
