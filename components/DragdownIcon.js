import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={9}
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.293 8.707a1 1 0 001.414 0l6.364-6.364A1 1 0 0013.657.93L8 6.586 2.343.929A1 1 0 00.93 2.343l6.364 6.364zM7 7v1h2V7H7z"
        fill="#637096"
      />
    </Svg>
  );
}

export default SvgComponent;
