import React, {useState, useEffect, useContext} from 'react';
import {Alert, View} from 'react-native';
import {St} from '../App';
import {Picker} from '@react-native-picker/picker';
import { getRequest } from '../actions';


const SalesTypePicker = ({setSalesType}) => {
  const Storage = useContext(St);
  const {userId, password} = Storage.data;
  const [salestypePick, setSalestypePick] = useState('');

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    async function _getData() {
      await getRequest('salestypes/00010101', userId, password).then((res) => {
        setTypeData(res.data.types);
        setSalesType(res.data.types[0].UIDType);
        setSalestypePick(res.data.types[0].Name);
      }).catch(err=>Alert.alert(err));
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
        selectedValue={salestypePick}
        onValueChange={(val, index) => {
          setSalestypePick(val), setSalesType(typeData[index].UIDType);
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

export default SalesTypePicker;
