import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectThemeMode } from '../features/theme/themeSlice'

/**
 * Hook to apply the dark class to the document root element
 * based on Redux theme state
 */
const useThemeEffect = () => {
  const themeMode = useSelector(selectThemeMode)

  useEffect(() => {
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [themeMode])

  return themeMode
}

export default useThemeEffect
