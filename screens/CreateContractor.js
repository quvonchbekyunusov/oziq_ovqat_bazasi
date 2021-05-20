import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input';
import {getRequest, postRequest} from '../actions/index';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {St} from '../App';
import DragUp from '../components/DragUp';
import {t} from 'react-native-tailwindcss';
import DragIcon from '../components/DragdownIcon';
import InnInput from '../components/InnInput';
import SalesPicker from '../components/SalesPicker';
import DeliveryPicker from '../components/DeliveryPicker';
import SalesTypePicker from '../components/SalesTypePicker';
import ClsAdressPicker from '../components/ClsAdressPicker';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    //   alignItems: "center",
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

const CreateContractor = ({navigation}) => {
  const [name, setName] = useState('');
  const [officialName, setOfficialName] = useState('');
  const [tin, setTin] = useState('');
  const [areaContractors, setAreaContractors] = useState([]);
  const [officialAddress, setOfficialAddress] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [account, setAccount] = useState('');
  const [contact, setContact] = useState('');
  const [director, setDirector] = useState('');
  const [salesChannel, setSalesChannel] = useState('');
  const [salesType, setSalesType] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [classifierAdress, setClassifierAdress] = useState('');
  const [gsea, setGsea] = useState('');
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);
  const [showqr, setShowqr] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [fillQRedit, setFillQRedit] = useState(true);
  const [press, setPress] = useState(false);
  const Storage = useContext(St);
  const {latitude, longitude, setContractorsId, setEditable} = useContext(St);

  const {userId, password} = Storage.data;
  const [more, setMore] = useState(true);
  const date = '00010101';

  const onSuccess = ({data}) => {
    setLoader2(true);
    const inn = data?.split('tin=')[1];
    const path  = `info/${inn}`
    if (inn) {
      getRequest(path, userId, password)
        .then((res) => {
          if (res.data?.data) {
            const data = res.data.data;
            setFillQRedit(false);
            setOfficialName(data.officialName);
            setOfficialAddress(data.officialAddress);
            setDirector(data.director);
            setGsea(data.gsea);
            setShowqr(false);
            setTin(inn);
            setLoader2(false);
          } else {
            Alert.alert(res.data)
          }
        })
        .catch((err) => Alert.alert(err));
    }
  };

  //get AREA CONTRACTOR================//
  useEffect(() => {
    if (userId && password) {
      async function _getDataWAuth() {
        const path = `contractors/00010101?longitude=${longitude}&latitude=${latitude}`;
        await getRequest(path, userId, password)
          .then((res) => {
            if (res.data) {
              setAreaContractors(res.data.Contractors);
              console.log(res);
              // (res.data.Contractors);
            } else {
              Alert.alert(res.data);
            }
          })
          .catch((err) => {
            Alert.alert(err);
          });
      }

      _getDataWAuth();
    }
  }, [userId, password]);
  console.log(
    areaContractors,
    'geoLOCATION NEW get++++++++++++++++++++++++++++',
  );
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);

  // ================================handleInn======================

  const handleInn = () => {
    if (userId && password && tin) {
      setLoader2(true);
      const path = `info/${tin}`
      getRequest(path, userId, password)
        .then((res) => {
          if (res.data?.data) {
            const data = res.data.data;
            setFillQRedit(false);
            setOfficialName(data.officialName);
            setOfficialAddress(data.officialAddress);

            setDirector(data.director);
            setGsea(data.gsea);
            setShowqr(false);
            setTin(tin);
            setLoader2(false);
          } else {
            Alert.alert(res.data)
          }
        })
        .catch((err) => Alert.alert(err));
    } else {
      alert('INN kiriting');
    }
  };

  // ================================handleInn======================

  //===================contractor post=================
  const contractorPost = () => {
    console.log(classifierAdress);
    setPress(true);
    setLoader(true);
    const contractor = {
      name: name,
      officialName: officialName,
      tin: tin,
      officialAddress: officialAddress,
      physicalAddress: physicalAddress,
      longitude: longitude,
      latitude: latitude,
      account: account,
      contact: contact,
      director: director,
      gsea: gsea,
      salesChannel: salesChannel,
      salesType: salesType,
      deliveryArea: deliveryArea,
      classifierAddress: classifierAdress,
      UIDShippingPoint: '',
      UIDContractor: '',
      visitDays: {
        mon: mon,
        tue: tue,
        wed: wed,
        thu: thu,
        fri: fri,
        sat: sat,
        sun: sun,
      },
    };

    if (
      name &&
      officialName &&
      tin &&
      officialAddress &&
      physicalAddress &&
      contact &&
      director
    ) {
      postRequest('contractors/00010101', contractor, userId, password)
        .then((res) => {
          if (res.status === 201) {
            navigation.navigate('Home');
            console.log(res.data);
          } else {
            alert(res.data);
          }
          setLoader(false);
        })
        .catch((err) => {
          alert(err);
          setLoader(false);
        });
    } else {
      if (!name) {
        alert('Iltimos hammasini to`ldiring');
      }

      setLoader(false);
    }
  };

  //===================contractor post=================

  return (
    <View style={{paddingVertical: 20}}>
      {showqr ? (
        loader ? (
          <ActivityIndicator size="large" />
        ) : (
          <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            containerStyle={{backgroundColor: '#FFF'}}
            reactivate={true}
            permissionDialogMessage="Откройте камеру"
            reactivateTimeout={10}
            showMarker={true}
            markerStyle={{borderColor: '#FFF', borderRadius: 10}}
          />
        )
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'Lato-Regular',
                marginTop: 10,
                marginBottom: 10,
              }}>
              Hamkor qo`shish
            </Text>
            <TouchableOpacity
              style={{marginTop: 10, marginLeft: 20, marginBottom: 10}}
              onPress={() => setShowqr(true)}>
              <Icon name="qrcode" size={30} color="#2323C8" />
            </TouchableOpacity>
          </View>
          {areaContractors?.length > 0 ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#2323C8',
                borderRadius: 10,
                width: '95%',
                alignSelf: 'center',
                marginBottom: 8,
              }}>
              <TouchableOpacity
                onPress={() => setMore((prev) => !prev)}
                style={{
                  height: 54,
                  width: '95%',
                  borderRadius: 10,

                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 20,
                      marginTop: 14,
                      color: '#2C2B47',
                      fontWeight: 'bold',
                      fontFamily: 'Golos-text_Regular',
                    }}>
                    Atrofda {areaContractors.length} ta savdo nuqtalari bor
                  </Text>
                </View>

                <View
                  style={{
                    marginRight: 24,
                    marginTop: 22,
                  }}>
                  {more ? <DragIcon /> : <DragUp />}
                </View>
              </TouchableOpacity>
              {!more ? (
                <ScrollView>
                  {areaContractors?.map((item, index) => (
                    <TouchableOpacity
                    onPress={()=>{
                      setContractorsId(item.UIDContractor);
                      navigation.navigate('ContractorInfo');
                      setEditable(false);
                    }}
                      key={index}
                      style={{
                        backgroundColor: '#FFFFFF',
                        marginVertical: 6,
                        marginHorizontal: 16,
                        borderRadius: 10,
                        shadowColor: '#FFFFFF',
                        padding: 10,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 10,
                      }}>
                      <View style={[t.flex, t.mB3, t.mT1]}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Golos-text_Regular',
                            color: '#2C2B47',
                            fontWeight: '700',
                            marginBottom: 5,
                          }}>
                          {item.Name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Golos-text_Regular',
                            fontSize: 14,
                            color: '#2C2B47',
                            fontWeight: '600',
                          }}>
                          {item.NameForCurrentUser}
                        </Text>
                      </View>
                      <View style={[t.flex, t.flexRow]}>
                        <Text
                          style={[
                            t.textLeft,
                            {
                              fontFamily: 'Golos-text_Regular',
                              fontSize: 14,
                              color: '#2C2B47',
                              fontWeight: '600',
                            },
                          ]}>
                          {item.Adrress}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View />
          )}

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Nomi
          </Text>
          <Input
            press={press}
            value={name}
            setValue={setName}
            placeholder="Nomi"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Rasmiy nomlanishi
          </Text>
          <Input
            press={press}
            editable={fillQRedit}
            value={officialName}
            setValue={setOfficialName}
            placeholder="Rasmiy nomlanishi"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            INN
          </Text>
          <InnInput
            value={tin}
            setValue={setTin}
            press={press}
            placeholder="INN"
            keyboardType="number-pad"
            handleInn={handleInn}
            loader2={loader2}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Rasmiy manzil
          </Text>
          <Input
            press={press}
            editable={fillQRedit}
            value={officialAddress}
            setValue={setOfficialAddress}
            placeholder="Rasmiy manzil"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Jismoniy manzil
          </Text>
          <Input
            press={press}
            value={physicalAddress}
            setValue={setPhysicalAddress}
            placeholder="Jismoniy manzil"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Qayd yozuvi
          </Text>
          <Input
            press={press}
            value={account}
            setValue={setAccount}
            placeholder="Qayd yozuvi"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Shartnoma
          </Text>
          <Input
            press={press}
            value={contact}
            setValue={setContact}
            placeholder="Shartnoma"
            keyboardType="number-pad"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Direktor
          </Text>
          <Input
            press={press}
            editable={fillQRedit}
            value={director}
            setValue={setDirector}
            placeholder="Direktor"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            gsea
          </Text>
          <Input
            press={press}
            editable={fillQRedit}
            value={gsea}
            setValue={setGsea}
            placeholder="gsea"
            keyboardType="number-pad"
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Sotish kanali
          </Text>
          <SalesPicker setSalesChannel={setSalesChannel} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
           Savdo turi
          </Text>
          <SalesTypePicker setSalesType={setSalesType} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Hududga etkazib berish
          </Text>
          <DeliveryPicker setDeliveryArea={setDeliveryArea} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Tasniflagich bo'yicha manzil
          </Text>
          <ClsAdressPicker setClassifierAdress={setClassifierAdress} />

          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Lato-Regular',
              marginVertical: 20,
            }}>
            Qabul kunlari
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={mon ? 'checked' : 'unchecked'}
                  onPress={() => setMon(!mon)}
                  style={styles.checkbox}
                />
                <Text>Yakshanba</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={tue ? 'checked' : 'unchecked'}
                  onPress={() => setTue(!tue)}
                  style={styles.checkbox}
                />
                <Text>Dushanba</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={wed ? 'checked' : 'unchecked'}
                  onPress={() => setWed(!wed)}
                  style={styles.checkbox}
                />
                <Text>Seshanba</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={thu ? 'checked' : 'unchecked'}
                  onPress={() => setThu(!thu)}
                  style={styles.checkbox}
                />
                <Text>Chorshanba</Text>
              </View>
            </View>
            <View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={fri ? 'checked' : 'unchecked'}
                  onPress={() => setFri(!fri)}
                  style={styles.checkbox}
                />
                <Text>Payshanba</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={sat ? 'checked' : 'unchecked'}
                  onPress={() => setSat(!sat)}
                  style={styles.checkbox}
                />
                <Text>Juma</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={sun ? 'checked' : 'unchecked'}
                  onPress={() => setSun(!sun)}
                  style={styles.checkbox}
                />
                <Text>Shanba</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2323C8',
              height: 40,
              width: 280,
              borderRadius: 5,
              alignSelf: 'center',
              margin: 20,
            }}
            onPress={contractorPost}>
            <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: 14}}>
              {loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                'Hamkor Qo`shish'
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default CreateContractor;
