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
        d="M8.707.293a1 1 0 00-1.414 0L.929 6.657A1 1 0 002.343 8.07L8 2.414l5.657 5.657a1 1 0 101.414-1.414L8.707.293zM9 2V1H7v1h2z"
        fill="#637096"
      />
    </Svg>
  );
}

export default SvgComponent;
