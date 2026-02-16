import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      userGrowth: [],
      engagement: [],
      reports: [],
      kpis: {},
    };
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    dateRange: '30d',
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDateRange } = analyticsSlice.actions;
export default analyticsSlice.reducer;