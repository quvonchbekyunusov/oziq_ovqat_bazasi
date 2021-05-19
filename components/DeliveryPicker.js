import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {St} from '../App';
import {Picker} from '@react-native-picker/picker';
import {getRequest} from '../actions';

const DeliveryPicker = ({setDeliveryArea}) => {
  const Storage = useContext(St);
  const {userId, password} = Storage.data;
  const [delivertype, setDelivertype] = useState('');

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    async function _getData() {
      await getRequest('deliveryareas/00010101', userId, password).then(
        (res) => {
          console.log('deliveryareas type =============>', typeof res.data);
          setTypeData(res.data.areas);
          setDeliveryArea(res.data.areas[0].UIDArea);
          setDelivertype(res.data.areas[0].Name);
        },
      );
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
        selectedValue={delivertype}
        onValueChange={(val, index) => {
          setDelivertype(val), setDeliveryArea(typeData[index].UIDArea);
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

export default DeliveryPicker;
