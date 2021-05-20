import React, {useEffect, useState, useContext} from 'react';
import {t} from 'react-native-tailwindcss';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {DeviceEventEmitter} from 'react-native';
import {St} from '../App';
import {postRequest} from '../actions/index';
import {Drawer, Text} from 'react-native-paper';
import {DrawerItem} from '@react-navigation/drawer';

const WrupUp = (props) => {
  const {data, latitude, longitude} = useContext(St);
  const [checkin, setCheckin] = useState(true);

  useEffect(() => {
    // device event emitter used to
    let subscription = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {
        console.log('json', e);
      },
    );
    return function cleanup() {
      subscription.remove();
    };
  }, []);

  //===================location post=================
  const locationPost = () => {
    const location = {
      longitude: longitude,
      latitude: latitude,
    };
    postRequest('locationupdate', location, data.userId, data.password)
      .then((res) => {
        if (res.status === 201) {
          alert(res.data.response);
        } else {
          alert(`${res.data}, longitude: ${longitude}, latitude: ${latitude}`);
        }
      })
      .catch((err) => alert(err));
  };

  //===================location post=================
  //192.168.1.124/dms/hs/app/units
  let obj = { routeName : "mainActivity", routeParams : {data:""} }
  const onStart = () => {
    // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
    setCheckin(false);
    if (ReactNativeForegroundService.is_task_running('taskid')) return;
    // Creating a task.
    ReactNativeForegroundService.add_task(locationPost, {
      delay: 1800000,
      onLoop: true,
      taskId: 'taskid',
      onError: (e) => console.log(`Error logging:`, e),
    });
    // starting  foreground service.
    return ReactNativeForegroundService.start({
      id: 144,
      title: 'Рабочий день начался',
      message: 'Приятного дня!',
      importance: 'high - IMPORTANCE_HIGH',
      vibration: true,
      button: true,
      buttonText: 'Press',
      buttonOnPress: JSON.stringify(obj)                          
    });
  };

  const onStop = () => {
    setCheckin(true);
    // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
    if (ReactNativeForegroundService.is_task_running('taskid')) {
      ReactNativeForegroundService.remove_task('taskid');
    }
    // Stoping Foreground service.
    return ReactNativeForegroundService.stop();
  };

  
  
  return (
    <View>
      <Drawer.Section>
        <Text style={[t.textRight, t.mR0]}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="arrowleft" color="#5B5B5B" size={32} />
            )}
            label=""
            onPress={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }
          />
        </Text>
        <DrawerItem
          style={[t.mT10]}
          icon={({color, size}) => (
            <Ionicons
              name="md-document-text-outline"
              color="#5B5B5B"
              size={32}
            />
          )}
          label="Tarixni ko`rsatish "
          onPress={() => props.navigation.navigate('HistoryHome')}
        />
        {checkin ? (
          <DrawerItem
            icon={({color, size}) => (
              <Ionicons name="alarm-outline" color="#5B5B5B" size={32} />
            )}
            label="Ishni boshlash"
            onPress={onStart}
          />
        ) : (
          <DrawerItem
            icon={({color, size}) => (
              <Ionicons name="alarm-outline" color="#5B5B5B" size={32} />
            )}
            label="Ishni tugatish "
            onPress={onStop}
          />
        )}
      </Drawer.Section>
    </View>
  );
};

export default WrupUp;
