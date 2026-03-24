import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

export const sendNotification = createAsyncThunk(
  'notifications/send',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/notifications/send', notificationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send notification');
    }
  }
);

export const fetchNotificationHistory = createAsyncThunk(
  'notifications/fetchHistory',
  async ({ limit = 20, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/notifications/history?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notification history');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    history: [],
    totalCount: 0,
    isLoading: false,
    isSending: false,
    error: null,
    success: false,
  },
  reducers: {
    clearNotificationState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNotification.pending, (state) => {
        state.isSending = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendNotification.fulfilled, (state) => {
        state.isSending = false;
        state.success = true;
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
      })
      .addCase(fetchNotificationHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload.notifications || action.payload;
        state.totalCount = action.payload.total || action.payload.length;
      })
      .addCase(fetchNotificationHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;