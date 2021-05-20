import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  StatusBar,
  Dimensions,
  RefreshControl
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/AntDesign';
import DragIcon from '../components/DragdownIcon';
import {St} from '../App';
import {numberWithSpaces} from '../scripts/dataTime';
import {ActivityIndicator} from 'react-native-paper';
import DragUp from '../components/DragUp';
import { getRequest} from '../actions/index';

const HistoryCheck = ({route, navigation}) => {
  const {id} = route.params;
  const [more, setMore] = useState(true);
  const [order, setOrder] = useState([]);
  const [err, setErr] = useState('');
  const Storage = React.useContext(St);
  const [loader, setLoader] = useState(false);
  const [more1, setMore1] = useState(true);
  const {userId, password} = Storage.data;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('HistoryHome');
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);

  //=====================RefreshControlll=================

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      
      if (userId && password && id) {
        async function _getOrders() {
          const path = `orderdetailed/${id}`
          await getRequest(path, userId, password)
            .then((res) => {
              setOrder(res.data.order);
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

  //=====================RefreshControlll=================
  //=====================getOrder========================
  useEffect(() => {
    setLoader(true);
    if (userId && password && id) {
      async function _getOrders() {
          const path = `orderdetailed/${id}`
          await getRequest(path, userId, password)
          .then((res) => {
            setOrder(res.data.order);
            setLoader(false);
          })
          .catch((err) => {
            setErr(err);
            setLoader(false);
          });
      }
      _getOrders();
    }
  }, [userId, password, id]);
  //=====================getOrder========================

  return (
    <>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      {loader ? (
        <ActivityIndicator size="large" />
      ) : order ? (
        <View style={styles.container}>
          <View style={{width: '100%', height: 60, backgroundColor: '#FAFAFA'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HistoryHome')}
              style={{width: 32, height: 31, marginRight: 16, marginTop: 14}}>
              <Icon name={'left'} size={32} color="#2323C8" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#5B5B5B',
                width: 223,
                position: 'absolute',
                left: 68,
                top: 23,
                alignItems: 'center',
                fontFamily: 'Golos-text_Regular',
              }}>
              {order.Contractor}
            </Text>
          </View>
          <ScrollView
           persistentScrollbar={true}
           refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           }>
            <View
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                shadowColor: 'rgba(40, 42, 117, 0.05)',
                paddingBottom: 10,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 3,
              }}>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Brend:</Text>
                <Text>{order.Brand}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Shartnoma:</Text>
                <Text>{order.Contract}</Text>
              </View>
              {/* <View style={styles.textView}>
                <Text style={styles.textColor}>Тип цен:</Text>
                <Text>{order.PriceType}</Text>
              </View> */}
              <View style={styles.textView}>
                <Text style={styles.textColor}>Ombor:</Text>
                <Text>{order.Warehouse}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Сумма:</Text>
                <Text>{order.Sum} сум</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Chegirma:</Text>
                <Text>{order.Discount} сум</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Chegirma turi:</Text>
                <Text>{order.DiscountType}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Yetkazib berish sanasi:</Text>
                {/* <TextInput value={editDate} onChangeText={(m) => setEditDate(m)} /> */}
                <Text> {order.Date}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textColor}>Jami:</Text>
                <Text>{order.Sum} сум</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setMore((prev) => !prev);
                  setMore1(true);
                }}
                style={{
                  height: 74,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#FAFAFA',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginBottom: 6,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 20,
                      marginTop: 14,
                      color: '#637096',
                      fontWeight: '500',
                      fontFamily: 'Golos-text_Regular',
                    }}>
                    {order?.Goods?.length} Pozitsiya
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      marginTop: 14,
                      color: '#5B5B5B',
                      fontFamily: 'Golos-text_Regular',
                    }}>
                    {order?.Goods?.reduce((a, b) => a + b.Amount, 0)}
                    шт.
                  </Text>
                </View>

                <View
                  style={{
                    marginRight: 24,
                    marginTop: 32,
                  }}>
                  {more ? <DragIcon /> : <DragUp />}
                </View>
              </TouchableOpacity>
              {!more ? (
                order.Goods.map((good, index) => (
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      marginVertical: 6,
                      marginHorizontal: 16,
                      borderRadius: 10,
                      shadowColor: '#FFFFFF',
                      height: 69,
                      padding: 10,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 3,
                    }}
                    key={index}>
                    <View style={[t.flex, t.flexRow, t.mB2]}>
                      <Text
                        style={[
                          t.w4_5,
                          {
                            fontSize: 12,
                            fontFamily: 'Golos-text_Regular',
                            color: 'rgba(44, 43, 71, 1)',
                          },
                        ]}>
                        {good.Name}
                      </Text>
                      <Text
                        style={[
                          t.w1_5,
                          t.textRight,
                          {
                            fontFamily: 'Golos-text_Regular',
                            fontSize: 14,
                            color: 'rgba(44, 43, 71, 1)',
                          },
                        ]}>
                        {good.Amount}
                      </Text>
                    </View>
                    <View style={[t.flex, t.flexRow]}>
                      <Text
                        style={[
                          t.w1_3,
                          t.textLeft,
                          {
                            fontFamily: 'Golos-text_Regular',
                            fontSize: 10,
                            color: 'rgba(44, 43, 71, 0.7)',
                          },
                        ]}>
                        Цена: {good.Price}
                      </Text>

                      <Text
                        style={[
                          t.w1_3,
                          t.textCenter,
                          {fontFamily: 'Golos-text_Regular'},
                        ]}>
                        {good.Discount !== 0 && (
                          <Text style={{fontSize: 10, color: '#265FFF'}}>
                            Chegirma: {good.Discount} %{' '}
                          </Text>
                        )}
                        {good.AmountPromotion !== 0 && (
                          <Text style={{fontSize: 10, color: '#265FFF'}}>
                            Aksiya: {good.AmountPromotion} шт{' '}
                          </Text>
                        )}
                      </Text>

                      <Text
                        style={[
                          t.w1_3,
                          t.textRight,
                          {
                            fontFamily: 'Golos-text_Regular',
                            fontSize: 12,
                            color: 'rgba(44, 43, 71, 0.7)',
                          },
                        ]}>
                        {numberWithSpaces(good.Sum)}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text>{err}</Text>
      )}
    </>
  );
};

export default HistoryCheck;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    height: Dimensions.get('screen').height,
  },
  textView: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  textColor: {
    flexDirection: 'row',
    fontSize: 14,
    color: 'rgba(91, 91, 91, 0.5)',
    fontFamily: 'Golos-text_Regular',
  },
});
