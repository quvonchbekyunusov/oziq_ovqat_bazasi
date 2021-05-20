import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CardOne from '../components/CardOne';
import Header from '../components/Header';
import WrupDown from '../components/WrupDown';
import {currentDate} from '../scripts/dataTime';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getRequest} from '../actions/index';
import {urlDate2} from '../scripts/dataTime';
import Modal from 'react-native-modal';
import {St} from '../App';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({route, navigation}) => {
  const {userId, password, UIDContract, created} = route.params;
  // const [lat, setLat] = useState();
  // const [long, setLong] = useState();
  const refRBSheet = useRef();
  const [steep, setSteep] = useState(0);
  const [contractors, setContractors] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState('');
  const [selectedBrend, setSelectedBrend] = useState('');
  const [selectedPriceType, setSelectedPriceType] = useState('');
  const [selectedWarehouses, setSelectedWarehouses] = useState('');
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState('');
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [step, setStep] = useState(1);
  const [onCreated, setOnCreated] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isAll, setIsAll] = useState(false)
  const [settlementstypes, setSettlementstypes] = useState('')


  const Storage = React.useContext(St);
  const {
    warehousesId,
    brendId,
    priceTypeId,
    contractId,
    contractorsId,
    setWarehousesId,
    setBrendId,
    setPriceTypeId,
    setContractId,
    setContractorsId,
    type, setType ,userData, setUserData,
    setShippingPoint 
  } = Storage;
  const date = '00010101';

  const [refreshing, setRefreshing] = useState(false);

  //======================backhandler============
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);

  //======================backhandler============
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      if (isAll) {
        setRefreshing(false);
        const path = `contractors/00010101`;
        getRequest(path, userId, password)
          .then((res) => {
            if (res.data.Contractors) {
              setContractors(res.data.Contractors);
              console.log(res.data);
            } else {
              alert(res.data);
              console.log(res.data);
            }
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        setRefreshing(false);
        const path = `contractors/00010101?VisitDay=${urlDate2()}&UnVisited=true`;
        getRequest(path, userId, password)
          .then((res) => {
            if (res.data) {
              setContractors(res.data.Contractors);
            } else {
              alert(res);
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  }, []);

  const openDrawer = () => {
    navigation.navigate('Dashboard');
  };

 
  const handleCreateContractor = () => {
    navigation.navigate('CreateContractor'); ///==========================//
  };


  const handleClick = (e) => {
    setContractorsId(e);
    setSteep(0);
    refRBSheet.current.open();
    setStep(1);
    setBrendId('');
    setContractId('');
    setPriceTypeId('');
    setWarehousesId('');
  };
  useEffect(() => {
    if (steep === 2) {
      navigation.navigate('EquipmentPhoto');
      // setModalVisible(!isModalVisible);
      refRBSheet.current.close();
    }
  }, [steep]);
  useEffect(() => {
    setLoad2(true);
    if (userId && password) {
      async function _getUserData() {
        await getRequest('userdata/00010101', userId, password)
        .then(res=>{
          if(res.status===200) {
            setUserData(res.data.data);
            setLoad2(false);
          } else {
            Alert.alert(res.data)
          }
        })
        .catch(err=>Alert.alert(err));
      }
      _getUserData();
    }
  }, [userId, password]);
  //======================getSetlementtypes==================
  useEffect(()=>{
    async function _getSetlement() {
      await getRequest('settlementstypes', userId, password)
      .then(res => {
        if(res.data.types[0]){
          setSettlementstypes(res.data.types);
        } else {
          alert(res.data)
        }
      }).catch(err => alert(err))
    }
    _getSetlement()
  }, [])
  //======================getSetlementtypes==================

  useEffect(() => {
    if (isAll) {
      setLoad(true);
      if (userId && password) {
        async function _getDataWAuth() {
          const path = `contractors/00010101`;
          await getRequest(path, userId, password)
            .then((res) => {
              if (res.data.Contractors) {
                console.log(res.data.Contractors);
                setLoad(false);
                setContractors(res.data.Contractors);
              } else {
                alert(res);
                alert(res.data);
              }
            })
            .catch((err) => {
              alert(err);
              setLoad(false);
            });
        }

        _getDataWAuth();
      }
    } else {
      setLoad(true);
      if (userId && password) {
        async function _getDataWAuth() {
          const path = `contractors/00010101?VisitDay=${urlDate2()}&UnVisited=true`;
          await getRequest(path, userId, password, date)
            .then((res) => {
              if (res.data.Contractors) {
                setLoad(false);
                setContractors(res.data.Contractors);
              } else {
                alert(res.data);
                alert(res);
              }
            })
            .catch((err) => {
              alert(err);
              setLoad(false);
            });
        }

        _getDataWAuth();
      }
    }
  }, [userId, password, isAll]);

  const filter2 = contractors.filter((d) => {
    return d.Name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleContractor = (e, s) => {
    setModalVisible2(true);
    setContractorsId(e);
    setShippingPoint(s)
  };

  return (
    <>
      <View>
        <Header
          icon1="left"
          icon2="search1"
          text={currentDate()}
          eventHandler={openDrawer}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          icon3="plussquareo"
          handleCreateContractor={handleCreateContractor}
        />
      </View>

      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          persistentScrollbar={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
            onPress={() => setIsAll(!isAll)}>
            <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: 14}}>
              {load ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : isAll ? (
                'Kunlar bo`yicha ko`rish'
              ) : (
                'Barcha hamkorlar'
              )}
            </Text>
          </TouchableOpacity>
          {load ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            filter2.map((contractor, index) => (
              <CardOne
                handleContractor={handleContractor}
                handleClick={handleClick}
                name={contractor.Name}
                adrress={contractor.Adrress}
                UIDShippingPoint = {contractor.UIDShippingPoint}
                // orderAmount={contractor.OrderAmount}
                // orderSum={contractor.OrderSum}
                key={index}
                id={contractor.UIDContractor}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        openDuration={1000}
        closeDuration={1000}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(44, 43, 71, 0.2)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 'auto',
          },
        }}>
        <WrupDown
        setType = {setType}
          brendId={brendId}
          contractId={contractId}
          warehousesId={warehousesId}
          priceTypeId={priceTypeId}
          settlementstypes = {settlementstypes}
          // onClickHandler5={onClickHandler5}
          step={step}
          setStep={setStep}
          load={load2}
          load3={load3}
          UIDContract={UIDContract}
          onCreated={onCreated}
          brendId={brendId}
          contractorsId={contractorsId}
          userId={userId}
          password={password}
          navigation={navigation}
          refRBSheet={refRBSheet}
          steep={steep}
          setSteep={setSteep}
          contracts={contracts}
          userData={userData}
          selectedContract={selectedContract}
          selectedBrend={selectedBrend}
          selectedPriceType={selectedPriceType}
          selectedWarehouses={selectedWarehouses}
          setSelectedContract={setSelectedContract}
          setSelectedBrend={setSelectedBrend}
          setSelectedPriceType={setSelectedPriceType}
          setSelectedWarehouses={setSelectedWarehouses}
          setContractId={setContractId}
          setBrendId={setBrendId}
          setPriceTypeId={setPriceTypeId}
          setWarehousesId={setWarehousesId}
        />
      </RBSheet>
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{flex: 1}}>
          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: 200,
              height: 200,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#2C2B47',
                margin: 5,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Есть оборудования?
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 10,
                width: 70,
                height: 40,
                backgroundColor: '#2C2B47',
                borderRadius: 5,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('EquipmentPhoto');
                setModalVisible(!isModalVisible);
              }}>
              <Text
                style={{
                  color: 'white',
                  margin: 5,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Да
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 5,
                width: 70,
                height: 40,
                backgroundColor: '#2C2B47',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('PhotoComment');
                setModalVisible(!isModalVisible);
              }}>
              <Text
                style={{
                  color: 'white',
                  margin: 5,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Нет
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* =======================Long Press Modal Start======================== */}

      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={{flex: 1}}>
          <View
            style={{
              marginTop: 30,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: 200,
              height: 200,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                width: '100%',
                padding: 5,
                height: 40,
                backgroundColor: '#2C2B47',
                borderRadius: 5,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('ContractorInfo');
                setModalVisible2(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  margin: 5,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Shartnoma kartochkasi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                width: '100%',
                borderRadius: 5,
                padding: 5,
                height: 40,
                backgroundColor: '#2C2B47',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('RefusedVisit', {userId, password});
                setModalVisible2(!isModalVisible2);
              }}>
              <Text
                style={{
                  color: 'white',
                  margin: 5,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Bekor qilish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* =======================Long Press Modal end======================== */}
    </>
  );
};

export default HomeScreen;
