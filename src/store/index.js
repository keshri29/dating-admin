import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import usersReducer from './slices/usersSlice';
// import kycReducer from './slices/kycSlice';
// import reportsReducer from './slices/reportsSlice';
// import moderationReducer from './slices/moderationSlice';
// import eventsReducer from './slices/eventsSlice';
import analyticsReducer from './slices/analyticsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme']
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  users: usersReducer,
// //   kyc: kycReducer,
//   reports: reportsReducer,
//   moderation: moderationReducer,
//   events: eventsReducer,
  analytics: analyticsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);