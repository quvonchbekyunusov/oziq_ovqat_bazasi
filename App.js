import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import WrupUp from './components/WrupUp';
import MainStackNavigator from './router/stackNavigator';
import SplashScreen from './node_modules/react-native-splash-screen';
const Drawer = createDrawerNavigator();
import HistoryHome from './screens/HistoryHome';
import CreateContractor from './screens/CreateContractor';
import Dashboard from './screens/Dashboard';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-easy-toast';
import { Alert, Linking, Text, View, TouchableOpacity, TextInput } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Modal } from 'react-native-paper';
import axios from 'axios';
import { sendData2 } from './actions';

export const St = React.createContext();
export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [userName, setUserName] = useState('');
  const [warehousesId, setWarehousesId] = useState('');
  const [brendId, setBrendId] = useState('');
  const [priceTypeId, setPriceTypeId] = useState('');
  const [contractId, setContractId] = useState('');
  const [contractorsId, setContractorsId] = useState('');
  const [photoReport, setPhotoReport] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [userData, setUserData] = useState([]);
  const [type, setType] = useState('');
  const [shippingPoint, setShippingPoint] = useState('')
  const [editable, setEditable] = useState(true)
  const [data, setData] = useState({
    userId: '',
    password: '',
  });
  const [visible, setVisible] = React.useState(false);
  const [token, setToken] = useState('')
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [notification, setNotification] = useState({
    title: undefined, 
    body: undefined,
    courier: undefined,
    manager:  undefined,
    Contractor: undefined,
    ContractorNumber: undefined,
    CourierNumber: undefined,
    Reason: undefined,
    UIDContractor: undefined
  });
  const getToken = async () => {
    const toke = await messaging().getToken();
    setToken(toke)
  }

  useEffect(() => {
    getToken();
    messaging().onMessage(remoteMessage => {
      console.log(remoteMessage);
      showModal();
      setNotification({
        title: remoteMessage.notification.title, 
        body: remoteMessage.notification.body,
        Contractor: remoteMessage.data.Contractor,
        ContractorNumber: remoteMessage.data.ContractorNumber,
        CourierNumber: remoteMessage.data.CourierNumber,
        Reason: remoteMessage.data.Reason,
        UIDContractor: remoteMessage.data.UIDContractor
      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      showModal();
      console.log(remoteMessage);
      
      setNotification({
        title: remoteMessage.notification.title, 
        body: remoteMessage.notification.body,
        Contractor: remoteMessage.data.Contractor,
        ContractorNumber: remoteMessage.data.ContractorNumber,
        CourierNumber: remoteMessage.data.CourierNumber,
        Reason: remoteMessage.data.Reason,
        UIDContractor: remoteMessage.data.UIDContractor
      });
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
          if (remoteMessage) {
            console.log(remoteMessage);
            showModal();
            setNotification({
              title: remoteMessage.notification.title, 
              body: remoteMessage.notification.body,
              Contractor: remoteMessage.data.Contractor,
              ContractorNumber: remoteMessage.data.ContractorNumber,
              CourierNumber: remoteMessage.data.CourierNumber,
              Reason: remoteMessage.data.Reason,
              UIDContractor: remoteMessage.data.UIDContractor
            });
          }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state)=>{
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: 'Ошибка с интернет соеденением',
          visibilityTime: 3000,
        });
      }
    });
    // pushSettings(Alert);
    SplashScreen.hide();
    return ()=> unsubscribe();
  }, []);
  useEffect(() => {
    console.log(data, '>>>>>>>>>><<<<<<<<<<<<><???KO');
  }, [data]);
  useEffect(() => {
    console.log(longitude, latitude, '1233333!!!!!!!!!!@333KO');
  }, [longitude, latitude]);
  return (
    <St.Provider
      value={{
        setData,
        data,
        longitude,
        latitude,
        setLatitude,
        setLongitude,
        userName,
        setUserName,
        warehousesId,
        brendId,
        priceTypeId,
        contractId,
        contractorsId,
        setWarehousesId,
        setBrendId,
        setPriceTypeId,
        setContractId,
        setContractorsId,
        photoReport,
        setPhotoReport,
        equipment,
        setEquipment,
        type, setType,
        userData, setUserData,
        editable, setEditable,
        token,
        shippingPoint, setShippingPoint
      }}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <WrupUp {...props} />}>
          <Drawer.Screen name="Home" component={MainStackNavigator} />
          <Drawer.Screen name="HistoryHome" component={HistoryHome} />
          <Drawer.Screen name="CreateContractor" component={CreateContractor} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>
      </NavigationContainer>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{
          backgroundColor: 'white', 
          width: '95%',
          display: 'flex',
          alignSelf: 'center',
          padding: 20,
          // height: 350,
          // alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
          
          <Text style={{margin: 10, fontSize: 16}}>Возврат: {notification.title}</Text>
          <Text style={{margin: 10, fontSize: 16}}>{notification.body}</Text>
          <Text style={{margin: 10, fontSize: 16}}><Icon name = "home" size={16} /> {notification.Contractor}</Text>
          {/* <Text style={{margin: 10, fontSize: 16}}>ContractorNumber: {notification.ContractorNumber}</Text>
          {notification?.CourierNumber?.length >0 &&
          <Text style={{margin: 10, fontSize: 16}}>CourierNumber: {notification.CourierNumber}</Text>} */}
          <Text style={{margin: 10, fontSize: 16}}>Причера возврата: {notification.Reason}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity 
            onPress={()=>Linking.openURL(`tel:${notification.ContractorNumber}`)}
            style={{margin: 10, borderRadius: 5, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'blue'}}>
              <Icon name = "phone-call" size ={16} color="#fff"/>
              <Text style={{marginLeft: 10, color: '#fff', fontSize: 16}}>Магазин</Text>
            </TouchableOpacity>
            {notification?.CourierNumber?.length >0 &&
            <TouchableOpacity 
            onPress={()=>Linking.openURL(`tel:${notification.CourierNumber}`)}
            style={{margin: 10, borderRadius: 5, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'blue'}}>
              <Icon name = "phone-call" size ={16} color="#fff"/>
              <Text style={{marginLeft: 10, color: '#fff', fontSize: 16}}>Куриер</Text>
            </TouchableOpacity>}
            <TouchableOpacity 
            onPress={hideModal}
            style={{margin: 10, borderRadius: 5, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'blue'}}>
              <Text style={{color: '#fff', fontSize: 16}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </St.Provider>
  );
}

