import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import ProfileScreen from './screens/Profile'
import passNEON from './screens/Pass-NEON'
import DrawerItems from './constants/DrawerItems';
import { Provider } from 'react-redux'
import Store from './store/configure'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Provider store={Store}>
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
                  : drawer.name === 'pass-NEON' ? passNEON 
                      :passNEON
              } 
            />)
          }
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
