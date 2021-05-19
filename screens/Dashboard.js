import React, {useState, useCallback, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  BackHandler,
  RefreshControl,
  PermissionsAndroid,
  StatusBar,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CarouselComponent from '../components/CarouselComponent';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import {DrawerActions} from '@react-navigation/native';
import {St} from '../App';
import {urlDate2} from '../scripts/dataTime';
import Geolocation from '@react-native-community/geolocation';
import Barchart from '../components/BarChart';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBarChart from '../components/RBarChart';
import { getRequest, postRequest } from '../actions';


const Dashboard = ({navigation, route}) => {
  const Storage = React.useContext(St);
  const [graph, setGraph] = useState([]);
  const [progress, setProgress] = useState([]);
  const [sales, setSales] = useState([]);
  const {userId, password} = Storage.data;
  const {userName, setLatitude, setLongitude, token} = Storage;
  const [refreshing, setRefreshing] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const refRBSheet = useRef();
  const [kpi, setKpi] = useState([]);
  const [barIndex, setBarIndex] = useState(0);
  const [bonuss, setBonuss] = useState([]);
  const [marginLeft, setmarginLeft] = useState(0);
  const [bonuus, setBonuus] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [bonusIndex, setBonusIndex] = useState();

  const showBonus = (bonus, index) => {
    const objBonus = kpi[barIndex].bonuses.filter((e) => e.bottom === bonus);
    setBonuus(objBonus[0] ? objBonus[0].bonus / 1000 : 0);
    setmarginLeft(bonus);
    setIsShow(true);
    setBonusIndex(index);
  };
 
  const onBarChart = (id) => {
    setIsShow(false);
    setBonuss([]);
    kpi[id]?.bonuses?.map((bonus) =>
      setBonuss((prev) => [...prev, bonus.top, bonus.bottom]),
    ),
      refRBSheet.current.open();
    setBarIndex(id);
    console.log(bonuss);
  };

  useEffect(() => {
    postToken =  async ()=>{
      await postRequest('writetoken', {token: token}, userId, password)
      .then(res=> console.log(res))
      .catch(err=>Alert.alert(err))
    }
    postToken()
  }, [token])

  useEffect(() => {
    if (
      barIndex &&
      kpi[barIndex].progress === 0 &&
      kpi[barIndex].progress !== undefined
    ) {
      bonuss?.sort().indexOf(0);
      showBonus(0, bonuss?.sort().indexOf(0));
    } else {
      const sortfilter = bonuss?.filter((s) => s <= kpi[barIndex].progress);
      if (sortfilter.length > 0) {
        showBonus(
          sortfilter.reduce((a, b) => Math.max(a, b)),
          bonuss.sort().indexOf(sortfilter.reduce((a, b) => Math.max(a, b))),
        );
      }
    }
  }, [barIndex, bonuss]);

  //=====================get KPI=================================
  useEffect(() => {
    if (userId && password) {
      const _getKPI = async () => {
        const path = `kpi/${urlDate2()}`;
        await getRequest(path, userId, password)
          .then((res) => {
            if(res.status === 200){
              setKpi(res.data.kpiData);
            } else {
              Alert.alert(res.data)
            }
          })
          .catch((err) => Alert.alert(err));
      };
      _getKPI();
    }
  }, [userId, password]);

  //=====================get KPI =================================

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      if (userId && password) {
        setRefreshing(false);
        const path = `salesgraph/${urlDate2()}`;
        getRequest(path, userId, password)
          .then((res) => {
            if(res.status === 200){
              setGraph(res.data.graphics)
            } else {
              Alert.alert(res.data)
            }
          })
          .catch((err) => Alert.alert(err));
        const path1 = `progress/${urlDate2()}`;
        getRequest(path1, userId, password)
          .then((res) => {
            if(res.status === 200) {
              setProgress(res.data.data)
            } else {
              Alert.alert(res.data)
            }
          })
          .catch((err) => Alert.alert(err));
        const path2 = `sales/${urlDate2()}`;
        getRequest(path2, userId, password)
          .then((res) => {
            if(res.status === 200) {
              setSales(res.data.data)
            } else {
              Alert.alert(res.data)
            }
          })
          .catch((err) => alert(err));
      }
    }, 2000);
  }, []);
  //=========get Location ======
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Требуется доступ к местоположению',
              message: 'требуется доступ к вашему местоположению',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('В доступе отказано');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Получение местоположения ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json

        //getting the Latitude from the location json

        //Setting Longitude state
        setLongitude(JSON.stringify(position.coords.longitude));
        //Setting Longitude state
        setLatitude(JSON.stringify(position.coords.latitude));
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');

        //getting the Longitude from the location json

        //getting the Latitude from the location json

        //Setting Longitude state
        setLongitude(JSON.stringify(position.coords.longitude));
        //Setting Latitude state
        setLatitude(JSON.stringify(position.coords.latitude));
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  //=============get graph=============

  useEffect(() => {
    async function _getData() {
      const path = `salesgraph/${urlDate2()}`;
      await getRequest(path, userId, password)
        .then((res) => {
          if(res.status === 200) {
            setGraph(res.data.graphics)
          } else {
            Alert.alert(re.data)
          }
        })
        .catch((err) => Alert.alert(err));
    }

    _getData();
  }, []);
  //=============get graph=============
  //=============get progress=============
  useEffect(() => {
    async function _getData() {
      const path = `progress/${urlDate2()}`;
      await getRequest(path, userId, password)
        .then((res) => {
          if(res.status === 200) {
            setProgress(res.data.data)
          } else {
            Alert.alert(res.data)
          }
        })
        .catch((err) => Alert.alert(err));
    }

    _getData();
  }, []);
  //=============get progress=============
  //=============get graph=============
  useEffect(() => {
    async function _getData() {
      const path = `sales/${urlDate2()}`;
      await getRequest(path, userId, password)
        .then((res) => {
          if(res.status === 200) {
            setSales(res.data.data)
          } else {
            Alert.alert(res.data)
          }
        })
        .catch((err) => Alert.alert(err));
    }

    _getData();
  }, [userId, password]);
  //=============get graph=============
  //open drawer
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  //backpress Android
  const toast = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  let currentCount = 0;
  const onBackPress = () => {
    if (currentCount < 2) {
      currentCount += 1;

      toast.current.show('press again to exit', 500, () => {
        // something you want to do at close
      });
    } else {
      BackHandler.exitApp();
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
    }
    return true;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="rgba(35, 35, 200, 1)" barStyle="default" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            backgroundColor: 'rgba(35, 35, 200, 1)',
            height: (Dimensions.get('window').width - 42) / 2,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginTop: 30, marginLeft: 18}}
              onPress={openDrawer}>
              <Icon name="appstore-o" size={22} color="#fff" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 19,
                marginRight: 16,
              }}>
              <Text style={{fontSize: 14, color: '#fff', marginRight: 19}}>
                {userName}
              </Text>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                }}></View>
            </View>
          </View>
        </View>
        
        <View style={{position: 'absolute', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 95,
              shadowColor: '#000',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HistoryHome', {userId, password})
              }
              style={{
                width: (Dimensions.get('window').width - 42) / 2,
                height: (Dimensions.get('window').width - 52) / 2,
                backgroundColor: 'rgba(96, 229, 157, 1)',
                borderRadius: 15,
                marginRight: 10,
                padding: 16,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.01,
                shadowRadius: 2,
                elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 42,
                  alignItems: 'center',
                }}>
                <Icon name="filetext1" size={10} color="#fff" />
                <Text style={{fontSize: 12, color: '#fff', marginLeft: 10}}>
                  Всего заказов
                </Text>
              </View>
              <Text style={{color: '#fff', fontSize: 40}}>
                {progress?.orders}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {userId, password})}
              style={{
                width: (Dimensions.get('window').width - 42) / 2,
                height: (Dimensions.get('window').width - 52) / 2,
                backgroundColor: 'rgba(255, 227, 130, 1)',
                borderRadius: 15,
                marginRight: 10,
                padding: 16,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.01,
                shadowRadius: 2,
                elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 42,
                  alignItems: 'center',
                }}>
                <Icon name="addfile" size={10} color="#fff" />
                <Text style={{fontSize: 12, color: '#fff', marginLeft: 10}}>
                  Осталось посетить
                </Text>
              </View>
              <Text style={{color: '#fff', fontSize: 40}}>
                {progress?.toAttend}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* ========================barchart===================== */}
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 10,
            alignSelf: 'center',
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            padding: 16,
            width: Dimensions.get('window').width - 32,
            marginTop: (Dimensions.get('window').width - 42) / 3,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#2C2B47'}}>
            KPI
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {kpi.map((el, index) => (
              <Barchart
                size={72}
                key={index}
                onBarChart={onBarChart}
                startDay={el.dateStart}
                endDay={el.dateEnd}
                percent={el.progress}
                name={el.name}
                id={index}
              />
            ))}
          </View>
        </View>
        {/* ========================barchart===================== */}
        <View style={{flex: 1, alignSelf: 'center'}}>
          <CarouselComponent graph={graph} />
        </View>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 10,
            alignSelf: 'center',
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            padding: 16,
            width: Dimensions.get('window').width - 32,
          }}>
          <Text style={{fontSize: 18, color: '#2C2B47', marginBottom: 13}}>
            Сумма продаж
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                width: (Dimensions.get('window').width - 74) / 2,
                height: (Dimensions.get('window').width - 74) / 4,
                backgroundColor: '#FFCD82',
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{fontSize: 15, color: 'rgba(200, 138, 47, 1)'}}>
                {sales?.week}
              </Text>
              <Text style={{fontSize: 9, color: '#C88A2F'}}>Неделя</Text>
            </View>
            <View
              style={{
                width: (Dimensions.get('window').width - 74) / 2,
                height: (Dimensions.get('window').width - 74) / 4,
                backgroundColor: '#8D99FF',
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{fontSize: 15, color: 'rgba(52, 67, 199, 1)'}}>
                {sales?.month}
              </Text>
              <Text style={{fontSize: 9, color: 'rgba(52, 67, 199, 1)'}}>
                Месяц
              </Text>
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          animationType="fade"
          customStyles={{
            wrapper: {},
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              height: 'auto',
            },
          }}>
          <RBarChart
            bonusIndex={bonusIndex}
            marginLeft={marginLeft}
            bonuus={bonuus}
            isShow={isShow}
            showBonus={showBonus}
            bonuss={bonuss}
            name={kpi[barIndex]?.name}
            startDay={kpi[barIndex]?.dateStart}
            endDay={kpi[barIndex]?.dateEnd}
            progress={kpi[barIndex]?.progress}
            goal={kpi[barIndex]?.goal}
            current={kpi[barIndex]?.current}
            bonuses={kpi[barIndex]?.bonuses}
          />
        </RBSheet>
        <Toast ref={toast} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
