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

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ limit = 10, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/users/get-users?limit=${limit}&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch users');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/admin/users/get-user-details/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch user details');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.patch(`${API_URL}/admin/users/update-status`, {
        id,
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update user status');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const fetchKYCRequests = createAsyncThunk(
  'users/fetchKYCRequests',
  async ({ limit = 10, offset = 0, status } = {}, { rejectWithValue }) => {
    try {
      const token = getToken();
      let url = `${API_URL}/admin/users/get-kycs?limit=${limit}&offset=${offset}`;
      if (status) {
        url += `&status=${status}`;
      }
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch KYC requests');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

export const updateKYCStatus = createAsyncThunk(
  'users/updateKYCStatus',
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.patch(`${API_URL}/admin/users/kyc-verify/${userId}/${status}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      return { userId, status, data: response.data };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update KYC status');
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('An error occurred. Please try again.');
      }
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null,
    totalCount: 0,
    currentPage: 0,
    pageSize: 10,
    isLoading: false,
    isUpdating: false,
    error: null,
    kycRequests: [],
    kycTotalCount: 0,
    kycCurrentPage: 0,
    kycPageSize: 10,
    kycIsLoading: false,
    kycError: null,
    kycUpdateLoading: false,
    otpVerification: {
      isLoading: false,
      success: false,
      error: null,
    },
  },
 reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setKYCPageSize: (state, action) => {
      state.kycPageSize = action.payload;
    },
    clearKYCError: (state) => {
      state.kycError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.users = responseData?.users || responseData || [];
        state.totalCount = responseData?.total || state.users.length;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload?.data || action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedUser = action.payload?.data || action.payload;
        if (updatedUser && updatedUser.id) {
          const index = state.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            state.users[index] = { ...state.users[index], ...updatedUser };
          }
        }
        if (state.selectedUser && state.selectedUser.id === action.meta.arg.id) {
          state.selectedUser = { ...state.selectedUser, status: action.meta.arg.status };
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchKYCRequests.pending, (state) => {
        state.kycIsLoading = true;
        state.kycError = null;
      })
      .addCase(fetchKYCRequests.fulfilled, (state, action) => {
        state.kycIsLoading = false;
        const responseData = action.payload?.data || action.payload;
        state.kycRequests = responseData?.kycs || responseData || [];
        state.kycTotalCount = responseData?.total || state.kycRequests.length;
      })
      .addCase(fetchKYCRequests.rejected, (state, action) => {
        state.kycIsLoading = false;
        state.kycError = action.payload || action.error.message;
      })
      .addCase(updateKYCStatus.pending, (state) => {
        state.kycUpdateLoading = true;
        state.kycError = null;
      })
      .addCase(updateKYCStatus.fulfilled, (state, action) => {
        state.kycUpdateLoading = false;
        const { userId, status } = action.payload;
        const index = state.kycRequests.findIndex(k => k.userId === userId || k.id === userId);
        if (index !== -1) {
          state.kycRequests[index] = { ...state.kycRequests[index], status };
        }
      })
      .addCase(updateKYCStatus.rejected, (state, action) => {
        state.kycUpdateLoading = false;
        state.kycError = action.payload || action.error.message;
      });
  },
});

export const { 
   setSelectedUser, 
  clearSelectedUser, 
  clearError, 
  setPageSize,
  setKYCPageSize,
  clearKYCError
} = usersSlice.actions;

export default usersSlice.reducer;