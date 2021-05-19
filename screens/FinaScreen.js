import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const FinaScreen = ({route, navigation}) => {
  const {data} = route.params;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);
  useEffect(()=>{
    setTimeout(()=>navigation.navigate('Home'), 3000)
  }, [])
  
  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        {data.status === 201 ? (
          <View>
            <Icon name="checkcircle" size={114} color="#2323C8" />
            <Text
              style={{
                color: '#5B5B5B',
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Golos-text_Regular',
              }}>
              Готово
            </Text>
          </View>
        ) : (
          <View>
            <Icon name="closecircle" size={114} color="red" style={{alignSelf: 'center'}} />
            <Text
              style={{
                color: '#fc2323',
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Golos-text_Regular',
              }}>
              {data?.data}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default FinaScreen;
