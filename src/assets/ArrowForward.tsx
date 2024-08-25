import React from 'react';
import { IconProps } from './IconProps';

const ArrowForward = ({ size = '32px' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="-200 -960 960 960"
      width={size}
      fill="#e8eaed"
    >
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </svg>
  );
};

export default ArrowForward;
