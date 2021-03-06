import React from 'react';

import { IconProps } from '../types';

const ArrowLeft: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M250.607 325.607C256.464 319.75 256.465 310.252 250.606 304.394L111.213 165.004L250.607 25.607C256.464 19.75 256.465 10.252 250.606 4.39399C244.748 -1.46401 235.251 -1.46401 229.393 4.39399L79.393 154.398C76.58 157.211 75 161.026 75 165.004C75 168.982 76.581 172.798 79.394 175.61L229.394 325.606C235.251 331.465 244.749 331.465 250.607 325.607Z"
        fill="black"
      />
    </svg>
  );
};

export default ArrowLeft;
