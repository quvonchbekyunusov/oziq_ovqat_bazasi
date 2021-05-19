import React from 'react';

import {Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const FotoList = ({item, deleteList}) => {
  return (
    <View
      style={{
        width: '95%',
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginVertical: 6,
        borderRadius: 10,
        height: 75,
        shadowColor: '#fff',
        // marginRight: 60,
        // marginHorizontal: 16,

        shadowOffset: {
          width: 0,
          height: 2,
        },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,

        elevation: 7,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: 5,
        }}>
        <Image
          style={{
            width: '30%',
            height: 65,
            marginLeft: 5,
            marginRight: 10,
            borderRadius: 10,
            backgroundColor: 'grey',
          }}
          source={{uri: item.image, cache: 'reload'}}
        />

        <View style={{width: '70%'}}>
          <View
            style={{
              width: '100%',
              height: 30,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: '100%',

                fontSize: 14,
                color: '#2E3A59',
                fontWeight: 'bold',

                marginBottom: 5,
                fontFamily: 'Golos-text_Regular',
              }}>
              {item.equipType || item.PhotoType}
            </Text>
          </View>
          <View
            style={{
              width: '100%',

              justifyContent: 'center',
            }}>
            <Text> {item.numberInput || item.comment}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingLeft: 15,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onPress={() => deleteList()}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FotoList;
