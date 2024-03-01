import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { toggleDarkMode } from './themeSlice';

describe('themeSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    });
  });

 test('should handle multiple toggle actions', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
   
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });
  test('should toggle dark mode correctly', () => {
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(true);
  });
  test('should toggle dark mode back to false', () => {
    store.dispatch(toggleDarkMode());
    store.dispatch(toggleDarkMode());
    const stateAfterToggle = store.getState().theme;
    expect(stateAfterToggle.darkMode).toBe(false);
  });



});
