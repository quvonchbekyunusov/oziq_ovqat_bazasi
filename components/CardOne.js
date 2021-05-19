import React from 'react';
import {t} from 'react-native-tailwindcss';
import {Text, TouchableOpacity, View} from 'react-native';

const CardOne = ({handleClick, id, name, adrress, handleContractor, UIDShippingPoint}) => {
  return (
    <TouchableOpacity
      style={[t.p4, {backgroundColor: '#fff', marginVertical: 6, borderRadius: 10, shadowColor: '#fff', 
      marginHorizontal: 16,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 3,
    }]}
      onPress={() => handleClick(id)}
      onLongPress = {()=>handleContractor(id, UIDShippingPoint)}>
      <View>
        <View style={[t.flex, t.flexRow, t.mB2]}>
          <Text
            style={[t.w4_5, {fontSize: 13, fontFamily: 'Golos-text_Regular', color: '#2C2B47', fontWeight: '600'}]}>
            {name}
          </Text>
          <Text style={[t.w1_5, t.textRight, {fontSize: 13, fontWeight: '500', color: '#2C2B47'}]}>{}</Text>
        </View>
        <View style={[t.flex, t.flexRow]}>
          <Text
            style={{width: '50%', fontSize: 11, fontFamily: 'Golos-text_Regular', color: 'rgba(44, 43, 71, 0.7)'}}>
            {adrress}
          </Text>
          <Text style={{width: '50%', textAlign: 'right', fontSize: 15}}>{}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardOne;
