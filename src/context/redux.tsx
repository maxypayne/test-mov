import { createSlice, configureStore } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'desktop',
  initialState: { desktop: false, user: {} },
  reducers: {
    toggleDesktop(state, action) {
      state.desktop = action.payload;
    },
    setUser(state, action){
      state.user = {...action.payload, isLog: !!action.payload.token};
    }
  }
});


export const store = configureStore({
  reducer: slice.reducer,
});

export const actions = slice.actions;