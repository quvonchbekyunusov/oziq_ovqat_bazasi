import React from 'react';
import {t} from 'react-native-tailwindcss';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator} from 'react-native-paper';
import {numberWithSpaces} from '../scripts/dataTime';
//import { useState } from 'react/cjs/react.development';

const styles = StyleSheet.create({
  numberSize: {
    fontSize: 16,
    color: '#5B5B5B',
    fontFamily: 'Golos-text_Regular',
  },
});
const WrupDownCount = ({
  setNewCount,
  newCount,
  isDone,
  summ,
  orderPush,
  load,
}) => {
  React.useEffect(() => {
    if (isDone) {
      goodsPush();
    }
  }, [isDone]);

  const handleCount = (e) => {
    setNewCount((prevCount) => prevCount + e);
  };

  const handleCut = (newCount) => {
    setNewCount(newCount.slice(0, -1));
  };
  return (
    <View
      style={{
        // backgroundColor: '#E5E5E5',
        // paddingHorizontal: 20,
        marginTop: 17, 
        marginBottom: 30,
        borderRadius: 5,
      }}>
      <View style={[t.flex, t.flexRow, t.mX10]}>
        <Text style={[t.w2_4, {color: 'rgba(38, 95, 255, 1)', marginTop: 10, fontSize: 14}]}>
          Jami:{' '}
          {numberWithSpaces(
            summ.reduce(function (a, b) {
              return a + b;
            }, 0),
          )}
        </Text>
        <Text style={[t.w2_4, t.textRight, t.mB4]}>
          <TouchableOpacity
            style={[
              t.bg,
              t.textWhite,
              {width: 80, height: 40,
              backgroundColor: '#2323C8', borderRadius: 10, shadowColor: '#2323C8', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 4,},
            ]}
            onPress={
              //() => {
              //   setLoad(true);
              //   orderPush().then((res) => {
              //     
              //     setLoad(false);
              //     navigation.navigate('CheckOrder', {
              //       data: res.data.appliedPromotion,
              //       userId,
              //       password,
              //     });
              //   });

              //   setSteep();
              //   // setDone(true);
              // }
              orderPush
            }>
            <Text style={[t.textCenter, t.mT2, {color: 'white'}]}>
              {load ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                'Tayyor'
              )}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <Text style={[t.textCenter]}>
        <View style={[t.flex, t.flexRow]}>
          <TouchableOpacity
            onPress={() => handleCount('1')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {paddingHorizontal: 20,
                backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                // shadowOpacity: 0.29,
                // shadowRadius: 4.65,
                elevation: 7,
                  },
            ]}>
            <Text style={styles.numberSize}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('2')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('3')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('4')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('5')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('6')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>6</Text>
          </TouchableOpacity>
        </View>
      </Text>
      <Text style={[t.textCenter]}>
        <View style={[t.flex, t.flexRow]}>
          <TouchableOpacity
            onPress={() => handleCount('7')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('8')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('9')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCount('0')}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7, paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>0</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
           style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.m1,
              {backgroundColor: '#FAFAFA', paddingHorizontal: 20},
            ]}>
            <Text style={styles.numberSize}>.</Text>
          </TouchableOpacity>  */}
          <TouchableOpacity
            onPress={() => handleCut(newCount)}
            style={[
              t.rounded,
              t.bgWhite,
              t.p4,
              t.pX10,
              t.m1,
              t.mL2,
              {backgroundColor: '#FAFAFA', backgroundColor: '#fff', borderRadius: 5, shadowColor: '#fff', 
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.29,
              // shadowRadius: 4.65,
              elevation: 7,},
            ]}>
            <Text>
              <Icon name="arrowleft" size={18} />
            </Text>
          </TouchableOpacity>
        </View>
      </Text>
    </View>
  );
};

export default WrupDownCount;
