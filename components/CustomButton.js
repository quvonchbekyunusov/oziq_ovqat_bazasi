import React from 'react';
import {t} from 'react-native-tailwindcss';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({title, id, onClickHandler, color, textColor}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onClickHandler(id, title)}
        style={{
          backgroundColor: color,
          width: 280,
          height: 40,
          borderRadius: 5,
          marginBottom: 10,
          borderColor: 'rgba(241, 243, 246, 20)',
          borderRightWidth: 3,
          borderLeftWidth: 3,
          shadowColor: '#fff',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 3,
        }}>
        <Text
          style={[
            t.textCenter,
            t.mT2,
            {
              fontSize: 14,
              fontFamily: 'Golos',
              color: textColor,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
