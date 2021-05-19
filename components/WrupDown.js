import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View, Text} from 'react-native';
import StepIcon from './StepIcon';
import CustomButton from './CustomButton';

const WrupDown = ({
  settlementstypes,
  brendId,
  warehousesId,
  setSteep,
  userData,
  setSelectedWarehouses,
  setWarehousesId,
  refRBSheet,
  load,
  step,
  setStep,
  setType,
}) => {
  const [contractIcon, setContractIcon] = useState(false);
  const [brendIcon, setBrendIcon] = useState(false);
 

  const onClickHandler2 = (id, title) => {
    setType(title);
    setStep(2);

  };

  const onClickHandler1 = (id, title) => {
    setSelectedWarehouses(title)
    setWarehousesId(id);
    setStep(3);
    setSteep(2)
    refRBSheet.current.close();
  };

  useEffect(() => {
    if (userData.warehouses.length === 1) {
      setWarehousesId(userData.warehouses[0].UIDWarehouse);
      setSteep(2);
      setStep(3);
    }
  }, [userData.warehouses.length]);

  useEffect(() => {
    if (step === 1) {
      setBrendIcon(false);
      setContractIcon(false);
    }
    if (step === 2) {
      setBrendIcon(true);
      setContractIcon(false);
    }
    if (step === 3) {
      setContractIcon(true);
      setBrendIcon(true);
    }
}, [step]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      {step === 1 && (
        <Text style={{fontSize: 14, fontFamily: 'Golos'}}>Выберите тип поселения</Text>
      )}
      {step === 2 && (
        <Text style={{fontSize: 14, fontFamily: 'Golos'}}>
          Выбрать склад
        </Text>
      )}

      <StepIcon
        brendId={brendId}
        contractIcon={contractIcon}
        brendIcon={brendIcon}
        step={step}
        setStep={setStep}
      />
      <ScrollView
        style={{
          paddingVertical: 20,
        }}>
        {userData.brends.length !== 1 &&
          step === 1 &&
          (load ? (
            <ActivityIndicator size="large" color="#5918EF" />
          ) : (
            settlementstypes.map((types, index) => (
              <CustomButton
                textColor='#5B5B5B'
                color= '#F1F3F6'
                title={types}
                id={index}
                key={index}
                onClickHandler={onClickHandler2}
              />
            ))
          ))}
        {userData.warehouses.length !== 1 &&
          step === 2 &&
          (load ? (
            <ActivityIndicator size="large" color="#5918EF" />
          ) : (
            userData.warehouses.map((warehouse) => (
              <CustomButton
                color={
                  warehousesId === warehouse.UIDWarehouse
                    ? '#2323C8'
                    : '#F1F3F6'
                }
                textColor={
                  warehousesId === warehouse.UIDWarehouse ? '#fff' : '#5B5B5B'
                }
                title={warehouse.Name}
                id={warehouse.UIDWarehouse}
                key={warehouse.UIDWarehouse}
                onClickHandler={onClickHandler1}
              />
            ))
          ))}
      </ScrollView>
    </View>
  );
};

export default WrupDown;
