// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number,
  color?: string,
};

export default function Help({ size = 16, color = "#000000" }: Props) {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size}>
      <Path
        fill={color}
        d="M8 15.417A7.417 7.417 0 1 1 8 .583a7.417 7.417 0 0 1 0 14.834zm0-1.5A5.917 5.917 0 1 0 8 2.083a5.917 5.917 0 0 0 0 11.834zm0-2.5a3.417 3.417 0 1 1 0-6.834 3.417 3.417 0 0 1 0 6.834zm0-1.5a1.917 1.917 0 1 0 0-3.834 1.917 1.917 0 0 0 0 3.834zm-5.244-6.1a.75.75 0 1 1 1.061-1.06l2.827 2.826a.75.75 0 1 1-1.061 1.06L2.756 3.818zm6.6 6.6a.75.75 0 0 1 1.061-1.06l2.827 2.826a.75.75 0 0 1-1.061 1.06l-2.827-2.826zm1.061-3.773a.75.75 0 0 1-1.06-1.061L11.71 3.23a.75.75 0 0 1 1.06 1.06l-2.353 2.354zm-6.6 6.6a.75.75 0 0 1-1.06-1.061l2.826-2.827a.75.75 0 1 1 1.06 1.061l-2.826 2.827z"
      />
    </Svg>
  );
}
