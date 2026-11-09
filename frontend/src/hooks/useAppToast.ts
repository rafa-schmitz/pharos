import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'

type ToastStatus = 'success' | 'error' | 'warning' | 'info'

interface ToastConfig {
  title: string
  status?: ToastStatus
  description?: string
}

const DEFAULT_TOAST_OPTIONS: Partial<UseToastOptions> = {
  duration: 2000,
  position: 'top-right',
  isClosable: true,
}

/**
 * Custom hook for standardized toast notifications across the app.
 * Provides pre-configured methods for common notification patterns.
 */
export const useAppToast = () => {
  const toast = useToast()

  const showToast = useCallback(
    ({ title, status = 'info', description }: ToastConfig) => {
      toast({
        title,
        description,
        status,
        ...DEFAULT_TOAST_OPTIONS,
      })
    },
    [toast]
  )

  const success = useCallback(
    (title: string, description?: string) => {
      showToast({ title, status: 'success', description })
    },
    [showToast]
  )

  const error = useCallback(
    (title: string, description?: string) => {
      showToast({ title, status: 'error', description })
    },
    [showToast]
  )

  const warning = useCallback(
    (title: string, description?: string) => {
      showToast({ title, status: 'warning', description })
    },
    [showToast]
  )

  const info = useCallback(
    (title: string, description?: string) => {
      showToast({ title, status: 'info', description })
    },
    [showToast]
  )

  return {
    showToast,
    success,
    error,
    warning,
    info,
  }
}
