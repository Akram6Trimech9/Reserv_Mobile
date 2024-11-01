import * as React from "react";
import Svg, { Circle, Path, Line } from "react-native-svg";

const CountryIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} color="#000000" fill="none" {...props}>
    <Circle cx="279.51" cy="229.72" r="100.29" stroke="currentColor" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M279.51,129.43C251,150.21,232,187.35,232,229.71s19,79.52,47.54,100.3c28.54-20.78,47.54-57.92,47.54-100.3S308.05,150.21,279.51,129.43Z" stroke="currentColor" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M279.51,416V363.44a133.72,133.72,0,0,1,0-267.44v33.43" stroke="currentColor" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="321.3" x2="237.72" y1="416" y2="416" stroke="currentColor" strokeWidth={13} strokeLinecap="round" />
    <Line x1="379.8" x2="179.22" y1="229.72" y2="229.72" stroke="currentColor" strokeWidth={13} strokeLinecap="round" />
  </Svg>
);

export default CountryIcon;
