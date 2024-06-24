import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slice/userSlice';


// Configuración de redux-persist para persistir el estado del usuario en el dispositivo
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user']
};

// Reducer principal que combina el reducer del usuario
const rootReducer = combineReducers({
  user: userReducer,
  // Añadir más reducers si se necesitan
});

// Reducer persistente que utiliza redux-persist para persistir el estado del usuario en el dispositivo
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store principal que utiliza redux-persist para persistir el estado del usuario en el dispositivo
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para evitar problemas con redux-persist
    }),
});


export const persistor = persistStore(store);

// Función para seleccionar el estado del usuario
export const selectUser = (state) => state.user;
