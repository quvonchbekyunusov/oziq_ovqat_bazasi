import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import FinalScreen from '../screens/FinaScreen';
import LoginScreen from '../screens/LoginScreen';
import AddContract from '../screens/AddContract';
import CheckOrder from '../screens/CheckOrder';
import HistoryCheck from '../screens/HistoryCheck';
import HistoryHome from '../screens/HistoryHome';
import CreateContractor from '../screens/CreateContractor';
import RefusedVisit from '../screens/RefusedVisit';
import Dashboard from '../screens/Dashboard';
import ContractorInfo from '../screens/ContractorInfo';
import EquipmentPhoto from '../screens/EquipmentPhoto';
import PhotoComment from '../screens/PhotoComment';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Final" component={FinalScreen} />
      <Stack.Screen name="AddContract" component={AddContract} />
      <Stack.Screen name="CheckOrder" component={CheckOrder} />
      <Stack.Screen name="HistoryCheck" component={HistoryCheck} />
      <Stack.Screen name="HistoryHome" component={HistoryHome} />
      <Stack.Screen name="CreateContractor" component={CreateContractor} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="RefusedVisit" component={RefusedVisit} />
      <Stack.Screen name="ContractorInfo" component={ContractorInfo} />
      <Stack.Screen name="EquipmentPhoto" component={EquipmentPhoto} />
      <Stack.Screen name="PhotoComment" component={PhotoComment} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
