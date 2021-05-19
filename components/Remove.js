import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={19}
      height={3}
      viewBox="0 0 19 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path fill="#FF6D6D" d="M0 2.067V.054h18.12v2.013z" />
    </Svg>
  );
}

export default SvgComponent;
