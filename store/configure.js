import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import myInfos from './reducer'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage
}
export default createStore(persistCombineReducers(rootPersistConfig, {myInfos}))