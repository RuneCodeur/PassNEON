import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import ProfileScreen from './screens/Profile'
import passNEON from './screens/Pass-NEON'
import DrawerItems from './constants/DrawerItems';
import { Provider } from 'react-redux'
import Store from './store/configure'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

const Drawer = createDrawerNavigator();

export default function App() {
  let persistor = persistStore(Store)
  return (
    <NavigationContainer>
      
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Drawer.Navigator 
            drawerType="front"
            initialRouteName="Profile"
            screenOptions={{
              activeTintColor: '#e91e63',
              itemStyle: { marginVertical: 10 },
            }}
          
          >
            {
              DrawerItems.map(drawer=>
                <Drawer.Screen 
                key = {drawer.name}
                name = {drawer.name}
                options = {{ headerShown: false}}
                component = {
                  drawer.name === 'Profile' ? ProfileScreen 
                    : drawer.name === 'Pass-Sanitaire' ? passNEON 
                        :passNEON
                } 
              />)
            }
          </Drawer.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
