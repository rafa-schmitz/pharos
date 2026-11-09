import { useEffect, useState } from 'react'

/**
 * Custom hook that debounces a value.
 * Useful for search inputs to avoid excessive API calls.
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce