import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BarChart from './BarChart';
import {urlDate3} from '../scripts/dataTime';
const RBarChart = ({
  name,
  startDay,
  endDay,
  progress,
  goal,
  current,
  bonuses,
  bonuss,
  showBonus, 
  bonuus,
  isShow,
  marginLeft,
  bonusIndex
}) => {
  const styles = StyleSheet.create({
    bonusContainer: {
      width: '25%',
      paddingVertical: 6,
      paddingHorizontal: 14,
      marginBottom: 11,
      marginLeft: `${marginLeft}%`,
      backgroundColor: '#fff',
      borderBottomEndRadius: 6,
      borderBottomRightRadius: 6,
      borderTopRightRadius: 6,
      borderTopEndRadius: 6,
      borderTopLeftRadius: 6,
      borderTopStartRadius: 6,
      marginTop: 28,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 3,
    },
    bonusContainerRight: {
      marginLeft: `${marginLeft - 20}%`,
      width: '25%',
      paddingVertical: 6,
      paddingHorizontal: 14,
      marginBottom: 11,
      marginRight: `${100 - marginLeft}%`,
      backgroundColor: '#fff',
      borderBottomStartRadius: 6,
      borderBottomLeftRadius: 6,
      borderTopRightRadius: 6,
      borderTopEndRadius: 6,
      borderTopLeftRadius: 6,
      borderTopStartRadius: 6,
      marginTop: 28,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 3,
    },
  });

  const currentDay = urlDate3();
 
  const sort = bonuss.sort();
  const oneDayGoal = (goal-current)/(endDay.split('.')[0]-currentDay.split('.')[0]);

  function myround(number, precision) {
    var result = Math.round(number * precision) /  precision;
    return result;
  }

 


  return (
    <View style={{paddingHorizontal: 16, paddingTop: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <BarChart
          size={114}
          startDay={startDay}
          endDay={endDay}
          percent={progress}
          onBarChart={() => {}}
        />
        <View style={{width: '50%'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#2C2B47',
              marginBottom: 12,
            }}>
            {name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 10,
                color: 'rgba(44, 43, 71, 0.5)',
                fontWeight: '500',
                marginBottom: 12,
              }}>
              Qolgan kunlar:{' '}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#2C2B47',
                fontWeight: '600',
                marginBottom: 12,
              }}>
              {endDay?.split('.')[0] - currentDay.split('.')[0]} kun
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 10,
                color: 'rgba(44, 43, 71, 0.5)',
                fontWeight: '500',
                marginBottom: 12,
              }}>
              Reja:{' '}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#2C2B47',
                fontWeight: '600',
                marginBottom: 12,
              }}>
              {goal}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 10,
                color: 'rgba(44, 43, 71, 0.5)',
                fontWeight: '500',
                marginBottom: 12,
              }}>
              Hozirgi:{' '}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#2C2B47',
                fontWeight: '600',
                marginBottom: 12,
              }}>
              {current}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 10,
                color: 'rgba(44, 43, 71, 0.5)',
                fontWeight: '500',
                marginBottom: 12,
              }}>
              Bir kunlik reja:{' '}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#2C2B47',
                fontWeight: '600',
                marginBottom: 12,
              }}>
              {oneDayGoal > 0 ? myround(oneDayGoal, 100) : '-'}
            </Text>
          </View>
        </View>
      </View>
      {isShow && (
        <View
          style={
            marginLeft > 75 ? styles.bonusContainerRight : styles.bonusContainer
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="star" size={5} color="#9498A8" />
            <Text
              style={{
                fontSize: 9,
                fontWeight: '500',
                color: '#2A3151',
                marginLeft: 3,
              }}>
              Bonus
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 12,
              color: `${marginLeft < progress ? 'rgba(42, 49, 81, 1)': '#9498A8'}`,
            }}>
            {Math.round(bonuus)} т.с
          </Text>
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: 4,
          backgroundColor: 'rgba(232, 238, 248, 1)',
          borderRadius: 20,
        }}>
        <View
          style={{
            width: `${progress > 100 ? 100 : progress}%`,
            height: 4,
            backgroundColor: 'rgba(35, 35, 200, 1)',
            borderRadius: 20,
          }}></View>
      </View>
      <View style={{flexDirection: 'row', position: 'relative'}}>
        {sort?.map((bonus, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginLeft: `${
                index !== 0 ? bonus - sort[index - 1] - 3 : bonus
              }%`,
              height: 30,
              paddingVertical: 7,
            }}
            onPress={() => showBonus(bonus, index)}>
            <Text style={{fontSize: 10, fontWeight: '600', color: `${index===bonusIndex ? 'blue': "black"}`}}>
              {bonus}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RBarChart;
