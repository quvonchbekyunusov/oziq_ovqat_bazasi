import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {urlDate3} from '../scripts/dataTime';

const BarChart = ({onBarChart, size, startDay, endDay, percent, name, id}) => {
  const currentDay = urlDate3();
  endDay?.split('.')[0] - currentDay.split('.')[0];
  const planPercent =
    ((endDay?.split('.')[0] - currentDay.split('.')[0]) * 100) /
    (endDay?.split('.')[0] - startDay?.split('.')[0]);
  const strokeWidth = 8;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 112,
      }}
      onPress={() => onBarChart(id)}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="transparent"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={planPercent > percent ? '#FA6161' : 'transparent'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            // strokeOpacity={0.2}
            strokeDashoffset={
              circumference - (circumference * planPercent) / 100
            }
          />
          <Circle
            stroke={planPercent > percent ? '#2323C8' : '#A5F8B2'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * percent) / 100}
          />
          <Circle
            stroke={planPercent < percent ? '#2323C8' : 'transparent'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            // strokeOpacity={0.2}
            strokeDashoffset={
              circumference - (circumference * planPercent) / 100
            }
          />
          <Circle
            stroke={
              planPercent < percent && percent > 100 ? '#A5F8B2' : 'transparent'
            }
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            // strokeOpacity={0.2}
            strokeDashoffset={
              circumference - (circumference * (percent - 100)) / 100
            }
          />
        </G>
      </Svg>
      <View
        style={{
          position: 'absolute',
          // alignItems: 'center',
          // justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: size > 72 ? 26 : 18,
            color: `${size > 72 ? '#2323C8' : '#2C2B47'}`,
            textAlign: 'center',
          }}>
          {percent}%
        </Text>
        <Text
          style={{
            fontSize: 7,
            fontWeight: '500',
            textAlign: 'center',
            width: 50,
            color: '#9595A3',
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BarChart;
