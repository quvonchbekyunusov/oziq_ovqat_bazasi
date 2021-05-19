import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Chart = ({item, index}) => {
  return (
    <View
      key={index}
      style={{
        alignSelf: 'center',
        borderRadius: 15,
        width: Dimensions.get('window').width - 32,

        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingBottom: 10,
        marginHorizontal: 16,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <Text style={{fontSize: 18, color: '#2C2B47'}}>{item.label}</Text>
        <Text style={{fontSize: 18, color: '#2C2B47'}}>{item.label2}</Text>
      </View>
      <LineChart
        data={item}
        width={Dimensions.get('window').width - 52}
        height={Dimensions.get('window').width - 170}
        // verticalLabelRotation={30}
        withVerticalLines={false}
        yAxisInterval={3}
        xLabelsOffset={0}
        fromZero={true}
        segments={3}
        formatYLabel={(props) => {
          return props.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }}
        chartConfig={{
          decimalPlaces: 2,
          fillShadowGradient: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(35, 35, 200, 1)`,
          labelColor: (opacity = 1) => `rgba(44, 43, 71,1)`,
          style: {
            //  alignSelf: 'center',
            //  backgroundColor: 'red'
            // width: 288,
            // borderRadius: 15,
            // marginTop: 80,
            // shadowColor: 'rgba(40, 42, 117, 0.05)',
            // paddingBottom: 10,
            // marginHorizontal: 16,
            // shadowOffset: {
            // width: 0,
            // height: 5,
            // },
            // // shadowOpacity: 0.29,
            // // shadowRadius: 4.65,
            // elevation: 10,
          },
          propsForDots: {
            r: '1',
            strokeWidth: '0',
            stroke: '#ffa726',
          },
        }}
        bezier
      />
    </View>
  );
};

export default Chart;
