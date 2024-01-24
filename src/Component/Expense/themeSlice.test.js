import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { toggleDarkMode, selectDarkMode } from './themeSlice';

describe('themeSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    });
  });

  it('should have initial state', () => {
    const initialState = store.getState().theme;
    expect(initialState).toEqual({ darkMode: false });
  });

  it('should toggle dark mode correctly', () => {
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(true);
  });

  it('should toggle dark mode back to false', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });

  it('should select dark mode from state', () => {
    store.dispatch(toggleDarkMode());
    const selectedDarkMode = selectDarkMode(store.getState());
    expect(selectedDarkMode).toBe(true);
  });

  it('should handle unknown action type gracefully', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION_TYPE' });
    const currentState = store.getState().theme;
    expect(currentState).toEqual({ darkMode: false });
  });

  it('should handle multiple toggle actions', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });

  it('should toggle dark mode multiple times correctly', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(true);
  });

  it('should handle multiple toggle actions with alternating states', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });

  it('should handle multiple toggle actions with correct state after each toggle', () => {
    store.dispatch(toggleDarkMode());
    const stateAfterFirstToggle = store.getState().theme;
    expect(stateAfterFirstToggle.darkMode).toBe(true);

   
  });
});
