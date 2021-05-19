import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import CardTwo from '../components/CardTwo';
import WrupDownCount from '../components/WrupDownCount';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import {getRequest, postRequest} from '../actions/index';
import {urlDate2} from '../scripts/dataTime';
import {St} from '../App';

const OrderScreen = ({navigation}) => {
  const {
    equipment,
    photoReport,
    warehousesId,
    contractorsId,
    userData,
    setBrendId,
    type
  } = useContext(St);
  const Storage = useContext(St)
  const {password, userId} = Storage.data
  const [steep, setSteep] = useState(2);
  const [nomenclatures, setNomenclatures] = useState([]);
  const [newCount, setNewCount] = useState('');
  const [isDone, setDone] = useState(false);
  const [x, setX] = useState(0);
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState('');
  const [summ, setSumm] = useState([]);
  const [postStatus, setPostStatus] = useState();
  const [onTouch, SetOnTouch] = useState('E5E5E5');
  const [showfooter, setShowfooter] = useState(true);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [indexBrend, setIndexBrend] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [indexNom,  setIndexNom] = useState(0)
  const [red, setRed] = useState(false)

  const onClickHandler = (index, i) => {
    SetOnTouch('blue');
    setX(index);
    setNewCount('');
    setIndexNom(i)
  };

  const testGods = () => {
   const Goods = [...nomenclatures.map((nomenclature)=> (
    nomenclature?.filter((i) => i.count > 0)
    .map((item) => ({
      UIDNomenclature: item.UIDNom,
      Amount: item.count,
      Price: item.Price,
      PromotionAmount: 0,
      Discount: 0,
    }))
 ))?.filter((el)=>el.length>0)]
   
    console.log(Goods);
  }

  const orderPush = () => {
    setLoad2(true);
    setSteep(4);
    const Goods = []
    nomenclatures.map((nomenclature)=> (
      nomenclature[1].filter((i) => i.count > 0)
      .map((item) => ({
        UIDNomenclature: item.UIDNom,
        Amount: item.count,
        Price: item.Price,
        PromotionAmount: 0,
        Discount: 0,
      }))
   ))?.filter((el)=>el.length>0).forEach(i=>{
     i.forEach(poi=>{
       Goods.push(poi)
     })
   })
   console.log(Goods);
    const order = {
      UIDBrand: '',
      UIDWarehouse: warehousesId,
      UIDContractor: contractorsId,
      SettlementsType: type,
      Date: urlDate2(),
      ShipmentDate: '',
      DiscountType: 'БезСкидки',
      Discount: 0,
      Comment: 'тестовый заказ покупателя, бом бом',
      PhotoReport: photoReport,
      Equipment: equipment,
      Goods: Goods
    };
    if (order.Goods.length !== 0) {
      return postRequest('promotion', order, userId, password).then((res) => {
        console.log(res.data);
        navigation.navigate('CheckOrder', {
          data: res.data.appliedPromotion,
          userId,
          password,
        });
        setLoad2(false);
      });
    } else {
      alert('пожалуйста закажите товар ');
      setLoad2(false);
    }
  };

  const pageChaenge = () => {
    
    Alert.alert(
      "Вы соглашаетесь с тем, то ваши покупки будут отменены?",
      "",
      [
        {
          text: "Да",
          
          onPress: () => {navigation.navigate('Home');
          setSteep(0)},
          style: "cancel",
        },
        {
          text: "Нет",
          onPress: () => {},
          style: "cancel",
        },
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       "This alert was dismissed by tapping outside of the alert dialog."
      //     ),
      // }
    );
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      pageChaenge();
      return true;
    });
    return BackHandler.removeEventListener();
  }, []);
 

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
      setShowfooter(false);
    });
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setShowfooter(true);
    });
    return () => {
      keyboardHide.remove();
      keyboardShow.remove();
    };
  }, []);
  useEffect(() => {
    setNomenclatures((prev) =>{
      if(prev[nomenclatures.indexOf(nomenclatures.filter((pre)=>pre[0]==userData.brends[indexBrend].UIDBrend)[0])])
       prev[nomenclatures.indexOf(nomenclatures.filter((pre)=>pre[0]==userData.brends[indexBrend].UIDBrend)[0])][1] = 
       prev[nomenclatures.indexOf(nomenclatures.filter((pre)=>pre[0]==userData.brends[indexBrend].UIDBrend)[0])][1].map((item, index) => {
        if (x === item.UIDNom && newCount < item.Amount) {
          return {
            ...item,
            count:newCount 
          }
        }
        if (x === item.UIDNom && newCount > item.Amount) {
          alert('товара недостаточно ');
        }
        return item;


      })
      return prev
    }
    );
  }, [newCount, indexBrend, nomenclatures]);

  console.log(nomenclatures.filter((pre)=>pre[0]==userData.brends[indexBrend].ui), 'filter===============>');

  function changeNum(num, i1,i2) {
    setNomenclatures(prev => {
      return prev.map((el1, index1) => {
        if(index1 == i1) el1.map((el2, index2) => {
          if(index2 == i2) return {
            ...el2,
            count: el2.count + num
          }
          return el2
        })
        return el1
      } )
    })
  }


  useEffect(() => {
    if (steep === 4 && postStatus) navigation.navigate('Final', {postStatus});
  }, [steep, postStatus]);

  useEffect(()=>{
    setNomenclatures([])
    userData.brends.forEach((brend, index) => {
      if (userId &&
        warehousesId &&
        contractorsId &&
        password && type) {
          async function _getNomenclatures() {
            const path = `nomenclatures/${urlDate2()}/${warehousesId}/${brend.UIDBrend}/${contractorsId}/${type}/00010101`
            await getRequest(
              path, 
              userId,
              password,
            ).then((res) => 
              {
                console.log(brend.UIDBrend);
                console.log(res.data);

              setNomenclatures(prev => [
                ...prev,
                prev[index] = [brend.UIDBrend, res?.data?.Nomenclatures.map((i) => {
                  i.count = 0;
                  return i;
                }),]
              ]),
             
              setLoad(false)
            })
            .catch(err=> {console.log(err); 
              Alert.alert(err)
              setLoad(false)
            })
          }
          _getNomenclatures()
      }
    })
  console.log(nomenclatures, 'nomenclatures==========================');
  }, [userId, password, warehousesId, contractorsId, type, userData.brends])
  const handleNom = (e, i) => {
    const brendid = e
    console.log(brendid);
    setBrendId(e);
    // setLoad(true);
    setIndexBrend(i)
  }

  return (
    <View style={{flex: 1}}>
      <Header
        icon1="left"
        text="Заказ покупателя"
        icon2="search1"
        eventHandler={pageChaenge}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        setShowfooter={setShowfooter}
      />
        <ScrollView>
          <View >
            {userData?.brends?.map((brend, index)=>(
              <View key ={brend?.UIDBrend+String(x)+newCount} id = {brend?.UIDBrend}>
              <TouchableOpacity 
                style={indexBrend === index && isShow? styles.isShow : styles.notShow}
                onPress={()=>{handleNom(brend.UIDBrend, index); setIsShow(!isShow)}}
              >
                <Text>{brend.Name}</Text>
               {indexBrend === index && isShow ? 
                <Icon name = 'up' size={14} color='black' /> :
                <Icon name = 'down' size={14} color='black' />
               }
              </TouchableOpacity>
              {isShow && 
              <View>
              { indexBrend == index &&
                nomenclatures?.forEach((nomenclature)=>(
                  (nomenclature[0]==brend.UIDBrend && isShow && nomenclature[1].length > 0) ? (
                    nomenclature[1]?.map((nomenclature, index)=>(
                      <CardTwo
                      name={nomenclature.Name}
                      amount={nomenclature.Amount}
                      UIDUnit={nomenclature.UIDUnit}
                      UIDNom={nomenclature.UIDNom}
                      Price={nomenclature.Price}
                      setSumm={setSumm}
                      countItem={nomenclature.count}
                      key={index + String(nomenclature.count) + x+newCount}
                      index={index}
                      x={x}
                      onClickHandler={onClickHandler}
                      />
                    )
                  )
                ): <View />))
              }
          </View>
              }
              </View>
            ))}
            
          </View>
        </ScrollView>
      {/* )} */}
      {!load && showfooter && isShow ? (
        <WrupDownCount
        indexNom = {indexNom}
        indexBrend={indexBrend}
        changeNum = {changeNum}
          load={load2}
          userId={userId}
          password={password}
          navigation={navigation}
          setDone={setDone}
          isDone={isDone}
          summ={summ}
          setNewCount={setNewCount}
          newCount={newCount}
          steep={steep}
          setSteep={setSteep}
          orderPush={testGods}
          orderPush={orderPush}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  isShow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '95%', alignSelf: 'center',
    backgroundColor: '#1985FF', 
    padding: 15, marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    color: '#fff'
  },
  notShow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '90%', alignSelf: 'center',
    backgroundColor: '#E5E5E5', 
    padding: 15, marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5
  }
})
