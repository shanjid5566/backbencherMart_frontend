import { createSlice } from '@reduxjs/toolkit'

// Get initial theme from localStorage or default to system preference
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

const initialState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions

// Selectors
export const selectThemeMode = (state) => state.theme.mode
export const selectIsDarkMode = (state) => state.theme.mode === 'dark'

export default themeSlice.reducer
