import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
//import {composeWithDevTools} from 'redux-devtools-extension'

import productsReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf') 
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{setFontLoaded(true)}} onError={(e)=>{console.log(e);}}/>
  }
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
