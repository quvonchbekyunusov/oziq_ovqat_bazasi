import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Camera1 from '../components/Camera1';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {St} from '../App';
import Modal from 'react-native-modal';
import FotoList from '../components/FotoList';
import {Picker} from '@react-native-picker/picker';
import { getRequest } from '../actions';


const EquipmentPhoto = ({navigation}) => {
  const Storage = useContext(St);
  const [numberInput, setNumberInput] = useState();
  const {setEquipment} = Storage;
  const {userId, password} = Storage.data;
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const [equipType, setEquipType] = useState('');
  const [typeId, setTypeId] = useState('');
  const [typeData, setTypeData] = useState([]);
  const [edata, setEdata] = useState([]);
  const [gdata, setGdata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePhotoChek = () => {
    if (gdata.length > 0) {
      navigation.navigate('PhotoComment');
      setEquipment(gdata);
    } else {
      alert('добавьте тип оборудования');
    }
  };

  useEffect(() => {
    async function _getData() {
      await getRequest('etypes/19700101', userId, password).then((res) => {
        setTypeData(res.data.types);
        setTypeId(res.data.types[0].UIDType);
        setEquipType(res.data.types[0].Name);
      });
    }

    _getData();
  }, []);

  const okHandler = () => {
    //   navigation.navigate('Home')
    if (numberInput) {
      setModalVisible(false);
      setNumberInput('');
      setEdata((prev) => [
        ...prev,
        {
          image: image.uri,
          equipType: equipType,
          numberInput,
        },
      ]);
      setGdata((prev) => [
        ...prev,
        {
          Photo: image.base64,
          UIDType: typeId,
          Number: numberInput,
        },
      ]);
    } else {
      alert('введите серийный номер');
    }
  };


  const deleteList = (index) => {
    setEdata(edata.filter((_, i) => i !== index));
    setGdata(gdata.filter((_, i) => i !== index));
  };
  return (
    <>
      {isOpen ? (
        <Camera1
          setModalVisible={setModalVisible}
          setImage={setImage}
          setIsOpen={setIsOpen}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header text="Оборудования " />

          <ScrollView>
            {edata?.map((item, index) => (
              <FotoList
                key={index}
                item={item}
                deleteList={() => deleteList(index)}
              />
            ))}
          </ScrollView>

          <Modal
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <Image
              source={{uri: image.uri}}
              style={{width: 300, height: 300}}
            />
            <View
              style={{
                marginTop: 5,
                width: 300,
                height: 'auto',
                borderRadius: 5,
                alignSelf: 'center',
                shadowColor: '#000',
                backgroundColor: 'white',
                margin: 10,
                padding: 5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text
                style={{
                  margin: 0,
                  textAlign: 'center',
                  color: 'rgba(44, 43, 71, 0.7)',
                }}>
                выбрать тип оборудования
              </Text>
              <Picker
                style={{
                  marginTop: 5,
                  // marginBottom: 10,
                  width: 300,
                  height: 45,
                  alignSelf: 'center',
                  shadowColor: '#000',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                selectedValue={equipType}
                onValueChange={(val, index) => {
                  setEquipType(val), setTypeId(typeData[index].UIDType);
                }}>
                {typeData?.map((item, index) => (
                  <Picker.Item
                    style={{textAlign: 'center'}}
                    label={item.Name}
                    value={item.Name}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
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
              value={numberInput}
              onChangeText={(e) => setNumberInput(e)}
              keyboardType="numeric"
              placeholder="серийный номер..."
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
              onPress={okHandler}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
                Готово
              </Text>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: 100,
            }}
            onPress={() => {
              setIsOpen(true);
            }}>
            <Icon name="circle-with-plus" size={44} color="green" />
          </TouchableOpacity>

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
            onPress={handlePhotoChek}>
            <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
              Готово
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default EquipmentPhoto;
