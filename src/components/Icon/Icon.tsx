import React, { FC } from 'react';

import icons from './icons';
import { IconProps } from './types';

export type IconType = keyof typeof icons;

interface Props extends IconProps {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<Props> = (props) => {
  const { icon, className, onClick, ...iconProps } = props;
  const element = React.createElement(icons[icon], iconProps);

  return (
    <span className={className} style={onClick ? { cursor: 'pointer' } : {}} onClick={onClick}>
      {element}
    </span>
  );
};

export default Icon;
