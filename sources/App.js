import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from './redux'
import MainNavigation from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const InnerNavigation = () => {
  return(
    <Provider store={store}>
      <SafeAreaProvider >
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}

const App = () => {
  return (
    <Provider store={store}>  
        <InnerNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})