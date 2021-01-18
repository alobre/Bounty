// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../Reducers/index';
// Middleware: Redux Persist Config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        "taskDetailReducer"
    ],
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
        applyMiddleware(
        createLogger(),
    ),
);
let persistor = persistStore(store);
export {
    store,
    persistor,
};