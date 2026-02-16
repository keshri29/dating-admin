import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockUsers } from '../../utils/mockData';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockUsers;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    suspendUser: (state, action) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.status = 'suspended';
      }
    },
    banUser: (state, action) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.status = 'deleted';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedUser, suspendUser, banUser } = usersSlice.actions;
export default usersSlice.reducer;