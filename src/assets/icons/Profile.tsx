import React from 'react';
import {Circle, Path, Svg, SvgProps} from 'react-native-svg';

export const ProfileIcon = ({color, height, width, ...props}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M16 20v-2a4 4 0 0 0-8 0v2" />
    </Svg>
  );
};
