import React, {useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Text, TouchableOpacity, View} from 'react-native';
import {numberWithSpaces} from '../scripts/dataTime';

const CardTwo = ({
  name,
  amount,
  countItem,
  Price,
  UIDUnit,
  UIDNom,
  x,
  index,
  onClickHandler,
  setSumm,
}) => {

  useEffect(() => {
    setSumm((prevs) => {
      let previous = [...prevs];
      previous[index] = countItem * Price;
      return previous;
    });
  }, [countItem, Price]);

  return (
    <TouchableOpacity
      style={[
        t.p2,
        {
          backgroundColor: x === UIDNom ? '#E8EDFF' : '#fff',
          borderColor: '#FAFAFA',
          marginVertical: 6, borderRadius: 10, height: 69, shadowColor: '#fff', 
          marginHorizontal: 16,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          
          elevation: 3,
          },
      ]}
      onPress={() => onClickHandler(UIDNom,  index)}>
      <View>
        <View style={[t.flex, t.flexRow, t.mB2]}>
          <Text
            style={[t.w4_5, {fontSize: 12, fontFamily: 'Golos-text_Regular', color: 'rgba(44, 43, 71, 1)'}]}>
            {name}
          </Text>
          <Text
            style={[t.w1_5, t.textRight]}>
            <Text style={{fontFamily: 'Golos-text_Regular', fontSize: 14, color: x === UIDNom ? '#fff' : 'rgba(44, 43, 71, 1)', backgroundColor: x === UIDNom ? '#265FFF' : '#fff', paddingHorizontal:5}}>{numberWithSpaces(countItem)}</Text>
          </Text>
        </View>
        <View style={[t.flex, t.flexRow]}>
          <Text
            style={[t.w1_3, t.textLeft, {fontFamily: 'Golos-text_Regular', fontSize: 10, color: 'rgba(44, 43, 71, 0.7)'}]}>
            Ост: {numberWithSpaces(amount)} {UIDUnit}
          </Text>
          <Text
            style={[t.w1_3, t.textLeft, {fontFamily: 'Golos-text_Regular', fontSize: 10, color: 'rgba(44, 43, 71, 0.7)'}]}>
            Цена: {numberWithSpaces(Price)}
          </Text>
          <Text
            style={[t.w1_3, t.textRight, {fontFamily: 'Golos-text_Regular',fontSize: 12, color: 'rgba(44, 43, 71, 0.7)'}]}>
            {numberWithSpaces(countItem * Price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardTwo;
