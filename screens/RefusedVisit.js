import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
// import ImagePicker from 'react-native-image-crop-picker';
import {St} from '../App';
import {urlDate2} from '../scripts/dataTime';
import Modal from 'react-native-modal';
import {getRequest, postRequest} from '../actions';
import {ActivityIndicator} from 'react-native-paper';
import Camera1 from '../components/Camera1';

const RefusedVisit = ({navigation}) => {
  const [refuseData, setRefuseData] = useState([]);
  const [reasonValue, setReasonValue] = useState('');
  const [image, setImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const Storage = useContext(St);
  const {contractorsId, latitude, longitude, shippingPoint} = useContext(St);
  const {userId, password} = Storage.data;
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  console.log(image.base64);

  // const takeFotofromCamera = () => {
  //   ImagePicker.openCamera({
  //     hideBottomControls: true,
  //     width: 300,
  //     height: 400,
  //   }).then((image) => {
  //     console.log(image);
  //     setImage(image.path);
  //     setModalVisible(true);
  //   }).catch(err=>alert(err));
  // };
  const orderPush = () => {
    setLoad(true);
    const order = {
      UIDContractor: contractorsId,
      RefusalReason: reasonValue,
      Date: urlDate2(),
      Longitude: longitude,
      UIDShippingPoint: shippingPoint,
      Latitude: latitude,
      PhotoReport: [
        {
          comment: comment,
          photo: image.base64,
          UIDPhotoType: 'denied'
        },
      ],
      Equipment: [],
    };

    return postRequest('deniedvisit', order, userId, password).then((res) => {
      if (res.status === 201) {
        navigation.navigate('Home');
        setLoad(false);
      } else {
        alert(res?.data);
        setLoad(false);
      }
    });
  };

  useEffect(() => {
    if (userId && password) {
      async function _getData() {
        await getRequest('refureasons', userId, password).then((res) => {
          setRefuseData(res.data.reasons);
          setReasonValue(res.data.reasons[0]);
        });
      }

      _getData();
    }
  }, [userId, password]);
  return (
    <>
      {isOpen ? (
        <Camera1
          setIsOpen={setIsOpen}
          setImage={setImage}
          setModalVisible={setModalVisible}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Header text="Bekor qilish sababi" />

          <View style={styles.inputContainer}>
            <Picker
              style={styles.input}
              placeholderTextColor="#666"
              selectedValue={reasonValue}
              onValueChange={(val) => setReasonValue(val)}>
              {refuseData.map((item, index) => (
                <Picker.Item label={item} value={item} key={index} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={{marginTop: 50}}
            onPress={() => {
              setIsOpen(true);
            }}>
            <Icon name="camera" size={60} color="green" />
          </TouchableOpacity>
          <View>
            <Image
              source={{uri: image.uri}}
              style={{width: 200, height: 200, borderRadius: 10}}
            />
          </View>
          <View>
            <Text style={{fontSize: 14, textAlign: 'center'}}>{comment}</Text>
          </View>
          <Modal
            style={{
              backgroundColor: '#E5E5E5',
              justifyContent: 'center',
              alignItems: 'center',
              width: 350,
            }}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <Image
              source={{uri: image.uri}}
              style={{width: 300, height: 300}}
            />
            <TextInput
              style={{
                marginTop: 5,
                // marginBottom: 10,
                width: 300,
                height: 'auto',
                borderRadius: 5,
                alignSelf: 'center',
                shadowColor: '#000',
                backgroundColor: '#fff',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              value={comment}
              onChangeText={(e) => setComment(e)}
              placeholder="Komentariya ..."
              placeholderTextColor="rgba(44, 43, 71, 0.7)"
            />
            <TouchableOpacity
              style={{
                width: 300,
                height: 35,
                backgroundColor: '#2323C8',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
                Tayyor
              </Text>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            style={{
              width: '70%',
              height: 35,
              backgroundColor: '#2323C8',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={orderPush}>
            <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
              {load ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                'Tayyor'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default RefusedVisit;
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,

    justifyContent: 'center',
    width: 280,
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 'auto',

    marginTop: 25,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
