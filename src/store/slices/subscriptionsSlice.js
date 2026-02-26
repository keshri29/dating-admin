import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      plans: [],
      bundles: {},
    };
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    plans: [],
    bundles: {
      likes: [],
      superLikes: [],
      boosts: [],
      comments: [],
    },
    isLoading: false,
    error: null,
    auditLogs: [],
  },
  reducers: {
    addPlan: (state, action) => {
      state.plans.push(action.payload);
      state.auditLogs.push({
        id: `audit_${Date.now()}`,
        adminId: 'current-admin',
        action: 'CREATE_PLAN',
        entity: 'plan',
        entityId: action.payload.id,
        timestamp: new Date().toISOString(),
        newValues: action.payload,
      });
    },
    updatePlan: (state, action) => {
      const index = state.plans.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        const oldValues = { ...state.plans[index] };
        state.plans[index] = action.payload;
        state.auditLogs.push({
          id: `audit_${Date.now()}`,
          adminId: 'current-admin',
          action: 'UPDATE_PLAN',
          entity: 'plan',
          entityId: action.payload.id,
          timestamp: new Date().toISOString(),
          oldValues,
          newValues: action.payload,
        });
      }
    },
    deletePlan: (state, action) => {
      const plan = state.plans.find(p => p.id === action.payload);
      state.plans = state.plans.filter(p => p.id !== action.payload);
      state.auditLogs.push({
        id: `audit_${Date.now()}`,
        adminId: 'current-admin',
        action: 'DELETE_PLAN',
        entity: 'plan',
        entityId: action.payload,
        timestamp: new Date().toISOString(),
        oldValues: plan,
      });
    },
    addBundle: (state, action) => {
      const { type } = action.payload;
      if (state.bundles[type]) {
        state.bundles[type].push(action.payload);
        state.auditLogs.push({
          id: `audit_${Date.now()}`,
          adminId: 'current-admin',
          action: 'CREATE_BUNDLE',
          entity: 'bundle',
          entityId: action.payload.id,
          timestamp: new Date().toISOString(),
          newValues: action.payload,
        });
      }
    },
    updateBundle: (state, action) => {
      const { type, id } = action.payload;
      if (state.bundles[type]) {
        const index = state.bundles[type].findIndex(b => b.id === id);
        if (index !== -1) {
          const oldValues = { ...state.bundles[type][index] };
          state.bundles[type][index] = action.payload;
          state.auditLogs.push({
            id: `audit_${Date.now()}`,
            adminId: 'current-admin',
            action: 'UPDATE_BUNDLE',
            entity: 'bundle',
            entityId: id,
            timestamp: new Date().toISOString(),
            oldValues,
            newValues: action.payload,
          });
        }
      }
    },
    deleteBundle: (state, action) => {
      const { type, id } = action.payload;
      if (state.bundles[type]) {
        const bundle = state.bundles[type].find(b => b.id === id);
        state.bundles[type] = state.bundles[type].filter(b => b.id !== id);
        state.auditLogs.push({
          id: `audit_${Date.now()}`,
          adminId: 'current-admin',
          action: 'DELETE_BUNDLE',
          entity: 'bundle',
          entityId: id,
          timestamp: new Date().toISOString(),
          oldValues: bundle,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload.plans;
        state.bundles = action.payload.bundles;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPlan,
  updatePlan,
  deletePlan,
  addBundle,
  updateBundle,
  deleteBundle,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;