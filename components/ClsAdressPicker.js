import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {St} from '../App';
import {Picker} from '@react-native-picker/picker';
import { getRequest } from '../actions';



const ClsAdressPicker = ({setClassifierAdress}) => {
  const Storage = useContext(St);
  const {userId, password} = Storage.data;
  const [adressPick, setAdressPick] = useState('');

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    async function _getData() {
      await getRequest('clsaddress/00010101', userId, password).then((res) => {
        setTypeData(res.data.clss);
        setClassifierAdress(res.data.clss[0].UIDClsAddr);
        setAdressPick(res.data.clss[0].Name);
      });
    }

    _getData();
  }, []);

  return (
    <View
      style={{
        marginTop: 5,
        // marginBottom: 10,
        width: '90%',
        height: 'auto',
        borderRadius: 5,
        backgroundColor: '#fff',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Picker
        selectedValue={adressPick}
        onValueChange={(val, index) => {
          setAdressPick(val), setClassifierAdress(typeData[index].UIDClsAddr);
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
  );
};

export default ClsAdressPicker;
