// @flow
import React from "react";
import Svg, { Path, Circle, G } from "react-native-svg";

type Props = {
  size?: number,
  color?: string,
};

export default function FaceIDFailed({ size = 80, color = "#000000" }: Props) {
  return (
    <Svg viewBox="0 0 80 80" width={size} height={size}>
      <G fill={color}>
        <Circle cx="40" cy="40" r="40" fillOpacity=".08" />
        <Path d="M31.03 31.878c-.736 0-1.333.597-1.333 1.334v3.879a1.333 1.333 0 1 0 2.667 0v-3.88c0-.735-.597-1.333-1.334-1.333zm17.94 6.546c.736 0 1.333-.597 1.333-1.333v-3.88a1.333 1.333 0 1 0-2.667 0v3.88c0 .736.598 1.333 1.334 1.333zm-.026 13.158a12.566 12.566 0 0 0-8.943-3.704 12.563 12.563 0 0 0-8.943 3.704 1.332 1.332 0 1 0 1.885 1.885 9.914 9.914 0 0 1 7.058-2.922 9.913 9.913 0 0 1 7.056 2.922 1.334 1.334 0 0 0 1.887-1.885zm-10.439-6.169c2.417 0 4.04-1.624 4.04-4.04v-8.161a1.333 1.333 0 1 0-2.667 0v8.161c0 1.217-.733 1.374-1.373 1.374a1.333 1.333 0 1 0 0 2.666zM17.333 34.545c.737 0 1.334-.597 1.334-1.333V26.4c0-4.265 3.468-7.733 7.733-7.733h4.388a1.333 1.333 0 1 0 0-2.667H26.4C20.666 16 16 20.666 16 26.4v6.812c0 .736.597 1.333 1.333 1.333zm13.455 26.788H26.4c-4.264 0-7.733-3.469-7.733-7.733v-6.811a1.333 1.333 0 1 0-2.667 0V53.6C16 59.334 20.666 64 26.4 64h4.388a1.333 1.333 0 1 0 0-2.667zM53.6 16h-4.389a1.333 1.333 0 1 0 0 2.667H53.6c4.264 0 7.733 3.468 7.733 7.733v6.812a1.333 1.333 0 1 0 2.667 0V26.4C64 20.666 59.334 16 53.6 16zm9.067 29.455c-.737 0-1.334.597-1.334 1.334V53.6c0 4.264-3.469 7.733-7.733 7.733h-4.389a1.333 1.333 0 1 0 0 2.666H53.6C59.334 64 64 59.334 64 53.6v-6.811c0-.737-.597-1.334-1.333-1.334z" />
      </G>
    </Svg>
  );
}
