import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://65.0.80.7.nip.io/api';

const getToken = () => {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const { auth } = JSON.parse(persistedState);
      const authState = JSON.parse(auth);
      return authState.token;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export const fetchModules = createAsyncThunk(
  'rbac/fetchModules',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/get-modules`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch modules');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const addModule = createAsyncThunk(
  'rbac/addModule',
  async (modules, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/admin/add-module`, 
        { modules },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to add module');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const fetchRoles = createAsyncThunk(
  'rbac/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/get-roles`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch roles');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const addRole = createAsyncThunk(
  'rbac/addRole',
  async (roleData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/admin/add-role`, 
        roleData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to add role');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const fetchPermissions = createAsyncThunk(
  'rbac/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/get-permissions`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch permissions');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const addPermission = createAsyncThunk(
  'rbac/addPermission',
  async (permissions, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/admin/add-permission`, 
        { permissions },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to add permissions');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const fetchAdmins = createAsyncThunk(
  'rbac/fetchAdmins',
  async ({ limit = 10, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/get-admins?limit=${limit}&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch admins');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const addAdmin = createAsyncThunk(
  'rbac/addAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/admin/add-admin`, 
        adminData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to add admin');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

const rbacSlice = createSlice({
  name: 'rbac',
  initialState: {
    modules: [],
    roles: [],
    permissions: [],
    admins: [],
    totalAdmins: 0,
    currentPage: 0,
    pageSize: 10,
    isLoading: false,
    isSubmitting: false,
    error: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.modules = responseData?.modules || responseData || [];
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addModule.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.success = 'Modules added successfully';
        const responseData = action.payload?.data || action.payload;
        if (responseData?.modules) {
          state.modules = [...state.modules, ...responseData.modules];
        }
      })
      .addCase(addModule.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.roles = responseData?.roles || responseData || [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addRole.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.success = 'Role added successfully';
        const responseData = action.payload?.data || action.payload;
        if (responseData?.role) {
          state.roles.push(responseData.role);
        }
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.permissions = responseData?.permissions || responseData || [];
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addPermission.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.success = 'Permissions added successfully';
        const responseData = action.payload?.data || action.payload;
        if (responseData?.permissions) {
          state.permissions = [...state.permissions, ...responseData.permissions];
        }
      })
      .addCase(addPermission.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.admins = responseData?.admins || responseData || [];
        state.totalAdmins = responseData?.total || state.admins.length;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addAdmin.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.success = 'Admin added successfully';
        const responseData = action.payload?.data || action.payload;
        if (responseData?.admin) {
          state.admins.push(responseData.admin);
          state.totalAdmins += 1;
        }
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, clearSuccess, setPageSize } = rbacSlice.actions;
export default rbacSlice.reducer;