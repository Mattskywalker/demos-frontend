import React from 'react';
import { IconProps } from './IconProps';

const ArrowBack = ({ size = '32px' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="-200 -960 960 960"
      width={size}
      fill="#e8eaed"
    >
      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
    </svg>
  );
};

export default ArrowBack;
