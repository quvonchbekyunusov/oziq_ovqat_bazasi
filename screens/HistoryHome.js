import React, {useState, useEffect} from 'react';
import {urlDate} from '../scripts/dataTime';
import {ScrollView, Text, View, BackHandler, Dimensions, RefreshControl} from 'react-native';
import Header from '../components/Header';
import HistoryCard from '../components/HistoryCard';
import DatePicker from 'react-native-datepicker';
import {St} from '../App';
import {getRequest} from '../actions/index';
import {ActivityIndicator} from 'react-native-paper';
const HistoryHome = ({navigation, route}) => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(false);
  const [orderDate, setGetDate] = useState(urlDate);
  const Storage = React.useContext(St);
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState();
  const [loader, setLoader] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  var a =
    orderDate.split('-')[0] + orderDate.split('-')[1] + orderDate.split('-')[2];
  console.log(orderDate);
  const {userId, password} = Storage.data;
  const [refreshing, setRefreshing] = useState(false);

  const handleClick = (id) => {
    navigation.navigate('HistoryCheck', {id});
  };

//=================Refresh countroll==============
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      
      if (userId && password && orderDate) {
        setLoader(true);
        async function _getOrders() {
          const path = `buyersorder?DateStart=${a}&DateEnd=${a}`
          await getRequest(path, userId, password)
            .then((res) => {
              setOrders(res.data.orders);
              setLoader(false);
              setRefreshing(false)
            })
            .catch((err) => {
              alert(err);
              setLoader(false);
              setRefreshing(false)
            });
        }
        _getOrders();
      }
    }, 2000)
  }, []);
//=================Refresh countroll==============

  //=============================get oreders ==================================
  useEffect(() => {
    if (userId && password && orderDate) {
      setLoader(true);
      async function _getOrders() {
          const path = `buyersorder?DateStart=${a}&DateEnd=${a}`
          await getRequest(path, userId, password)
          .then((res) => {
            setOrders(res.data.orders);
            setLoader(false);
          })
          .catch((err) => {
            setErr(err);
            setLoader(false);
          });
      }
      _getOrders();
    }
  }, [userId, password, orderDate]);
  //=============================get oreders ==================================
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);
  const openDrawer = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
    navigation.navigate('Dashboard');
  };
  return (
    <View style={{Height: 'auto', maxHeight: windowHeight}}>
      <Header
        icon1="left"
        icon2=""
        text={
          <DatePicker
            style={{width: 200}}
            date={orderDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2025-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                width: 0,
                height: 0,
              },
              dateText: {
                fontWeight: 'bold',
                fontSize: 18,
                color: '#fff',
              },
              dateInput: {
                marginLeft: 25,
                borderWidth: 0,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setGetDate(date)}
          />
        }
        eventHandler={openDrawer}
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {loader ? (
        <ActivityIndicator size="large" />
      ) : orders ? (
        <ScrollView 
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {orders.map((order) => (
            <HistoryCard
              handleClick={handleClick}
              key={order.UIDOrder}
              id={order.UIDOrder}
              Contractor={order.Contractor}
              Name={order.Name}
              OrderState={order.OrderState}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>{err}</Text>
      )}
    </View>
  );
};

export default HistoryHome;
