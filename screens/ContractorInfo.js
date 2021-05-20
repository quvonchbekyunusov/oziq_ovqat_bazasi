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
import Input from '../components/Input';
import {getRequest, postRequest} from '../actions/index';
import {St} from '../App';
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

const ContractorInfo = ({navigation}) => {
  const Storage = useContext(St);
  const {userId, password} = Storage.data;
  const {longitude, latitude, contractorsId, setEditable, editable} = Storage;
  const [name, setName] = useState('');
  const [officialName, setOfficialName] = useState('');
  const [tin, setTin] = useState('');
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
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    if (userId && password) {
      async function _getDataWAuth() {
        const path = `contractors/00010101?UIDContractor=${contractorsId}`;
        console.log(path);
        await getRequest(path, userId, password).then((res) => {
          if(res.status === 200) {
            console.log(res.data);
            setLoad(false);
            setName(res.data.Contractor.name);
            setOfficialName(res.data.Contractor.officialName);
            setTin(res.data.Contractor.tin);
            setOfficialAddress(res.data.Contractor.officialAddress);
            setPhysicalAddress(res.data.Contractor.physicalAddress);
            setAccount(res.data.Contractor.account);
            setContact(res.data.Contractor.contact);
            setDirector(res.data.Contractor.director);
            setGsea(res.data.Contractor.gsea);
            setSalesChannel(res.data.Contractor.salesChannel);
            setSalesType(res.data.Contractor.salesType);
            setDeliveryArea(res.data.Contractor.deliveryArea);
            setClassifierAdress(res.data.Contractor.classifierAddress)
            setMon(res.data.Contractor.visitDays.mon);
            setTue(res.data.Contractor.visitDays.tue);
            setWed(res.data.Contractor.visitDays.wed);
            setThu(res.data.Contractor.visitDays.thu);
            setFri(res.data.Contractor.visitDays.fri);
            setSat(res.data.Contractor.visitDays.sat);
            setSun(res.data.Contractor.visitDays.sun);
          } else {
            Alert.alert(res.data)
          }
        }).catch(err=>  Alert.alert(err));
      }

      _getDataWAuth();
    }
  }, [userId, password]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setEditable(true)
      navigation.navigate('Home');
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);

  //===================contractor post=================
  const contractorPost = () => {
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

      UIDContractor: contractorsId,
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
            setEditable(true);
            console.log(res.data);
          } else {
            console.log(res.data);
            Alert.alert(res.data);
          }
          setLoader(false);
        })
        .catch((err) => {
          alert(err);
          setLoader(false);
        });
    } else {
      alert('Заполните все поле');
      setLoader(false);
    }
  };

  //===================contractor post=================

  return (
    <View style={{paddingVertical: 20}}>
      {load ? (
        <ActivityIndicator size="large" color="blue" />
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
              Shartnoma kartochkasi
            </Text>
          </View>
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Nomi
          </Text>
          <Input value={name} setValue={setName} placeholder="ИNomiмя" />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Ofitsial nomi
          </Text>
          <Input
            value={officialName}
            setValue={setOfficialName}
            placeholder="Ofitsial nomi"
            editable={editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            INN
          </Text>
          <Input
            value={tin}
            setValue={setTin}
            placeholder="INN"
            keyboardType="number-pad"
            editable={editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Official Address
          </Text>
          <Input
            value={officialAddress}
            setValue={setOfficialAddress}
            placeholder="Official Address"
            editable ={editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Phisical Address
          </Text>
          <Input
            value={physicalAddress}
            setValue={setPhysicalAddress}
            placeholder="Phisical Address"
            editable={editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Hisob raqami
          </Text>
          <Input
            value={account.toString()}
            setValue={setAccount}
            keyboardType="number-pad"
            placeholder="Hisob raqami"
            editable = {editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Shartnoma
          </Text>
          <Input value={contact} setValue={setContact} placeholder="Shartnoma" editable = {editable} />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Direktor
          </Text>
          <Input
            value={director}
            setValue={setDirector}
            placeholder="Direktor"
            editable = {editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            gsea
          </Text>

          <Input
            value={gsea}
            setValue={setGsea}
            placeholder="gsea"
            keyboardType="number-pad"
            editable = {editable}
          />
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Sotuv kanali
          </Text>
          <SalesPicker setSalesChannel={setSalesChannel} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Savdo markazi turi
          </Text>
          <SalesTypePicker setSalesType={setSalesType} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Tumanlar bo`yicha yetkazib berish
          </Text>
          <DeliveryPicker setDeliveryArea={setDeliveryArea} />

          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 20}}>
            Klassifikator bo`yicha manzil
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
                'Shartnomani O`zgartirish'
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default ContractorInfo;
