import React, {useState, useEffect, useContext} from 'react';
import {t} from 'react-native-tailwindcss';
import {St} from '../App';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import DragUp from '../components/DragUp';
import Icon from 'react-native-vector-icons/AntDesign';
import DragIcon from '../components/DragdownIcon';
import DatePicker from 'react-native-datepicker';
import {postRequest} from '../actions/index';
import {numberWithSpaces} from '../scripts/dataTime';
import {ActivityIndicator} from 'react-native-paper';
import Round from '../components/Round';
const ChekOrder = ({route, navigation}) => {
  const {
    Sum,
    DiscountSum,
    ToPay,
    SettlementsType,
    WarehouseName,
    PriceTypeName,
    Date,
    Goods,
    ContractorName,
  } = route.params.data;
  const {userId, password} = route.params;
  const [more, setMore] = useState(true);
  const [more1, setMore1] = useState(true);
  const [load, setLoad] = useState(false);
  const [editDate, setEditDate] = useState(Date);
  const {latitude, longitude, equipment, photoReport, type, shippingPoint} = useContext(St);


  const a = editDate.split('-').reverse().join('');
  const orderPush = () => {
    const order = {
      VanSell: true,
      UIDBrand: route.params.data.UIDBrand,
      UIDWarehouse: route.params.data.UIDWarehouse,
      UIDContractor: route.params.data.UIDContractor,
      SettlementsType: type,
      Date: a,
      Longitude: longitude,
      Latitude: latitude,
      ShipmentDate: route.params.data.ShipmentDate,
      DiscountType: route.params.data.DiscountType,
      Discount: route.params.data.Discount,
      Comment: route.params.data.Comment,
      Sum: Sum,
      PhotoReport: photoReport,
      Equipment: equipment,
      Goods: Goods,
      UIDShippingPoint: shippingPoint
    };
    console.log(order);
    setLoad(true);
    return postRequest('buyersorder', order, userId, password).then((res) => {
      navigation.navigate('Final', {
        data: res,
      });
      setLoad(false);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
          {ContractorName}
        </Text>
      </View>
      <ScrollView>
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
            <Text style={styles.textColor}>To`lov turi:</Text>
            <Text> {SettlementsType}</Text>
          </View>
          {/* <View style={styles.textView}>
            <Text style={styles.textColor}>Тип цен:</Text>
            <Text> {PriceTypeName} </Text>
          </View> */}
          <View style={styles.textView}>
            <Text style={styles.textColor}>Ombor:</Text>
            <Text>{WarehouseName}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textColor}>Jami hisob:</Text>
            <Text> {numberWithSpaces(Sum)} So`m</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textColor}>Chegirma:</Text>
            <Text> {numberWithSpaces(DiscountSum)} So`m</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textColor}>Yetkazib berish sanasi:</Text>

            <DatePicker
              date={editDate}
              style={{width: 100}}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-05-2016"
              maxDate="01-06-2025"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateText: {
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#5B5B5B',
                },
                dateInput: {
                  borderWidth: 0,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => setEditDate(date)}
            />
            <Round />
          </View>

          <View style={styles.textView}>
            <Text style={styles.textColor}>Jami:</Text>
            <Text> {numberWithSpaces(ToPay)} So`m</Text>
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setMore((prev) => !prev);
              setMore1(true);
            }}
            style={{
              marginTop: 0,
              height: 74,
              width: '100%',
              marginBottom: 6,
              borderWidth: 1,
              borderColor: '#FAFAFA',
              backgroundColor: '#E5E5E5',
              flexDirection: 'row',
              justifyContent: 'space-between',
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
                {Goods.length} Pozitsiya
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 14,
                  color: '#5B5B5B',
                  fontFamily: 'Golos-text_Regular',
                }}>
                {Goods.reduce((a, b) => a + b.Amount, 0)}
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
            <View>
              {Goods.map((item, i) => (
                <View
                  key={i}
                  style={[
                    t.p4,
                    {
                      backgroundColor: '#FFFFFF',
                      marginVertical: 6,
                      marginHorizontal: 16,
                      borderRadius: 10,
                      height: 69,
                      shadowColor: '#FFFFFF',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 3,
                    },
                  ]}>
                  <View>
                    <View style={[t.flex, t.flexRow, t.mB2]}>
                      <Text
                        style={[
                          t.w4_5,
                          {
                            fontSize: 12,
                            fontFamily: 'Golos-text_Regular',
                            color: '#2C2B47',
                          },
                        ]}>
                        {item.Name}
                      </Text>
                      <Text
                        style={[
                          t.w1_5,
                          t.textRight,
                          {
                            fontFamily: 'Golos-text_Regular',
                            fontSize: 14,
                            color: '#2C2B47',
                          },
                        ]}>
                        {item.Amount}
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
                        Цена: {numberWithSpaces(item.Price)}
                      </Text>

                      <Text
                        style={[
                          t.w1_3,
                          t.textCenter,
                          {fontFamily: 'Golos-text_Regular'},
                        ]}>
                        {item.Discount !== 0 && (
                          <Text style={{fontSize: 10, color: '#265FFF'}}>
                            Chegirma: {item.Discount} %{' '}
                          </Text>
                        )}
                        {item.PromotionAmount !== 0 && (
                          <Text style={{fontSize: 10, color: '#265FFF'}}>
                            Aksiya: {item.PromotionAmount} шт{' '}
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
                            color: '#2C2B47',
                          },
                        ]}>
                        {numberWithSpaces(item.Sum)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 30,
          marginBottom: 30,
          height: 110,
          backgroundColor: '#E5E5E5',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={orderPush}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(35, 35, 200, 1)',
            height: 40,
            width: 280,
            borderRadius: 10,
            marginTop: 220,
          }}>
          <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: 14}}>
            {load ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Buyurtma qilish'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChekOrder;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    height: Dimensions.get('window').height,
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
