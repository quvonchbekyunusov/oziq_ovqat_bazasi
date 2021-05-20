import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {St} from '../App';
import FotoList from '../components/FotoList';
import Modal from 'react-native-modal';
import Camera1 from '../components/Camera1';
import {Picker} from '@react-native-picker/picker';
import { getRequest } from '../actions';
const PhotoComment = ({navigation}) => {
  const Storage = useContext(St);
  const [comment, setComment] = useState('');
  const {setPhotoReport} = Storage;
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const [cdata, setCdata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fdata, setFdata] = useState([]);

  const {userId, password} = Storage.data;
  const [PhotoType, setPhotoType] = useState('');
  const [UIDPhotoType, setPhototypeId] = useState('');
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    async function _getData() {
      await getRequest('phototypes/19700101', userId, password).then((res) => {
        if(res.status === 200) {
          setTypeData(res.data.types);
        setPhototypeId(res.data.types[0].UIDPhotoType);
        setPhotoType(res.data.types[0].Name);
        } else {
          Alert.alert(res.data)
        }
      }).catch(err=>Alert.alert(err));
    }
    _getData();
  }, []);

  const okHandler = () => {
    setModalVisible(false);
    setFdata((prev) => [
      ...prev,
      {
        image: image.uri,
        PhotoType: PhotoType,
        comment,
      },
    ]);
    setCdata((prev) => [
      ...prev,
      {
        comment: comment,
        UIDPhotoType: UIDPhotoType,
        photo: image.base64,
      },
    ]);
    setImage('');

    setComment('');
    // setModalVisible(false);
  };

  const checkSend = () => {
    if (cdata.length > 0) {
      navigation.navigate('Order'), setPhotoReport(cdata);
    } else {
      alert('Mahsulotni suratga tushiring');
    }
  };
  const deleteList = (index) => {
    setFdata(fdata.filter((_, i) => i !== index));
    setCdata(cdata.filter((_, i) => i !== index));
  };
  return (
    <>
      {isOpen ? (
        <Camera1
          setImage={setImage}
          setModalVisible={setModalVisible}
          setIsOpen={setIsOpen}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header text="Mahsulot surati " />
          <ScrollView>
            {fdata?.map((item, index) => (
              <FotoList
                key={index}
                item={item}
                deleteList={() => deleteList(index)}
              />
            ))}
          </ScrollView>
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
          <Modal
            style={{
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
              {/* <Text
                style={{
                  margin: 0,
                  textAlign: 'center',
                  color: 'rgba(44, 43, 71, 0.7)',
                }}>
                выбрать тип фото полок
              </Text> */}
              {/* <Picker
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
                selectedValue={PhotoType}
                onValueChange={(val, index) => {
                  setPhotoType(val),
                    setPhototypeId(typeData[index].UIDPhotoType);
                }}>
                {typeData?.map((item, index) => (
                  <Picker.Item
                    style={{textAlign: 'center'}}
                    label={item.Name}
                    value={item.Name}
                    key={index}
                  />
                ))}
              </Picker> */}
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
              onPress={okHandler}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
                Tayyor
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
            onPress={checkSend}>
            <Text style={{fontWeight: '600', fontSize: 14, color: '#FFFFFF'}}>
              Tayyor
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PhotoComment;
