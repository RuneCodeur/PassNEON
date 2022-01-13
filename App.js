import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import ProfilScreen from './screens/Profil';
import passNEON from './screens/Pass-NEON';
import QRscan from './screens/QRscan';
import notes from './screens/note';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Store from './store/configure';

const Drawer = createDrawerNavigator();

export default function App() {
  let persistor = persistStore(Store)

  return (
    <NavigationContainer>
      
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Drawer.Navigator 
            drawerType="front"
            initialRouteName = "Pass-Vaccinal"
            screenOptions={{
              activeTintColor: '#e91e63',
              itemStyle: { marginVertical: 10 },
          }}>
            
            <Drawer.Screen
              name = 'Pass-Vaccinal'
              options = {{ headerShown: false,
                drawerItemStyle: { fontWeight: '700', } }}
              component = { passNEON } 
            />
            <Drawer.Screen
              name = 'mon profil'
              options = {{ headerShown: false }}
              component = { ProfilScreen } 
            />
            <Drawer.Screen
              name = 'scan'
              options = {{ headerShown: false,
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true }}
              component = { QRscan }
            />
            <Drawer.Screen
              name = 'Notes du Développeur'
              options = {{ headerShown: false, drawerItemStyle: { marginTop: 25 } }}
              component = { notes }
            />
            
          </Drawer.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}