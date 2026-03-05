import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import usersReducer from './slices/usersSlice';
import analyticsReducer from './slices/analyticsSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';
import rbacReducer from './slices/rbacSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  users: usersReducer,
  analytics: analyticsReducer,
  subscriptions: subscriptionsReducer,
  rbac: rbacReducer,
});

export default rootReducer;