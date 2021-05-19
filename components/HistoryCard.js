import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {t} from 'react-native-tailwindcss';

const HistoryCard = ({handleClick, Name, Contractor, id, OrderState}) => {
  const ChangeColor = (a) => {
    switch (a) {
      case 'Аннулирован':
        return '#EF5354';
      case 'Возврат':
        return '#EF5354';
      case 'Отгружен':
        return 'lightgreen';
      case 'ВДоставке':
        return 'lightgreen';
      case 'Обработка':
        return '#fff';
    }
  };
  return (
    <TouchableOpacity
      style={[
        t.p4,
        {
          backgroundColor: ChangeColor(OrderState),
          marginVertical: 1,
          borderRadius: 10,
          height: 69,
          shadowColor: '#fff',
          marginVertical: 6,
          marginHorizontal: 16,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 3,
        },
      ]}
      onPress={() => handleClick(id)}>
      <View>
        <View style={[t.flex, t.flexRow, t.mB2, t.justifyBetween]}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Golos-text_Regular',
              color: 'rgba(44, 43, 71, 1)',
            }}>
            {Contractor}
          </Text>
          <Text style={{fontWeight: 'bold'}}>{OrderState}</Text>
        </View>
        <View style={[t.flex, t.flexRow]}>
          <Text
            style={{
              width: '100%',
              fontSize: 12,
              fontFamily: 'Golos-text_Regular',
              color: 'rgba(44, 43, 71, 0.7)',
            }}>
            {Name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
