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
    // Dispatch the toggleDarkMode action
    store.dispatch(toggleDarkMode());

    // Check if the state has been updated correctly
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(true);
  });

  it('should toggle dark mode back to false', () => {
    // Dispatch toggleDarkMode twice
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());

    // Check if the state has been updated correctly
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });

  it('should select dark mode from state', () => {
    // Dispatch toggleDarkMode to change the state
    store.dispatch(toggleDarkMode());

    // Use selectDarkMode to get the selected value
    const selectedDarkMode = selectDarkMode(store.getState());
    expect(selectedDarkMode).toBe(true);
  });

  it('should handle unknown action type gracefully', () => {
    // Dispatch an unknown action type
    store.dispatch({ type: 'UNKNOWN_ACTION_TYPE' });

    // Check if the state remains unchanged
    const currentState = store.getState().theme;
    expect(currentState).toEqual({ darkMode: false });
  });

  it('should handle multiple toggle actions', () => {
    // Dispatch toggleDarkMode three times
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());

    // Check if the state has been updated correctly
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });
});

