import React from 'react';

import { IconProps } from '../types';

const ArrowRight: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path
          d="M79.393 4.39252C73.536 10.2495 73.535 19.7475 79.394 25.6055L218.787 164.996L79.393 304.393C73.536 310.25 73.535 319.748 79.394 325.606C85.252 331.464 94.749 331.464 100.607 325.606L250.607 175.602C253.42 172.789 255 168.974 255 164.996C255 161.018 253.419 157.202 250.606 154.39L100.606 4.39352C94.749 -1.46548 85.251 -1.46548 79.393 4.39252Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="330" height="330" fill="white" transform="translate(0 330) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRight;
