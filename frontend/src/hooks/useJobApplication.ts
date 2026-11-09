import { useState, useEffect, useCallback } from 'react'
import { createAppliedJob, existAppliedJob } from '../services/appliedJobsService'
import { useAuth } from '../context/AuthContext'
import { useAppToast } from './useAppToast'

interface UseJobApplicationOptions {
  jobId: number
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

interface UseJobApplicationReturn {
  isApplied: boolean
  isLoading: boolean
  isCheckingStatus: boolean
  canApply: boolean
  applyToJob: () => Promise<void>
}

/**
 * Custom hook for managing job application state and actions.
 * Handles checking if already applied, applying to jobs, and loading states.
 */
export const useJobApplication = ({
  jobId,
  onSuccess,
  onError,
}: UseJobApplicationOptions): UseJobApplicationReturn => {
  const { isAuthenticated, user } = useAuth()
  const toast = useAppToast()

  const [isApplied, setIsApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(true)

  const isRecruiter = user?.usertype === 'ROLE_RECRUITER'
  const canApply = isAuthenticated && !isApplied && !isRecruiter

  // Check if user has already applied to this job
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!isAuthenticated) {
        setIsCheckingStatus(false)
        return
      }

      try {
        const hasApplied = await existAppliedJob(jobId)
        setIsApplied(hasApplied)
      } catch (error) {
        console.error('Error checking application status:', error)
      } finally {
        setIsCheckingStatus(false)
      }
    }

    checkApplicationStatus()
  }, [jobId, isAuthenticated])

  const applyToJob = useCallback(async () => {
    if (!isAuthenticated) {
      toast.warning('Você precisa se autenticar')
      return
    }

    if (isRecruiter) {
      toast.warning('Recrutadores não podem se candidatar a vagas')
      return
    }

    if (isApplied) {
      toast.info('Você já se candidatou a esta vaga')
      return
    }

    setIsLoading(true)

    try {
      await createAppliedJob(jobId)
      setIsApplied(true)
      toast.success('Vaga aplicada com sucesso!')
      onSuccess?.()
    } catch (error) {
      toast.error('Erro ao aplicar na vaga')
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, isRecruiter, isApplied, jobId, toast, onSuccess, onError])

  return {
    isApplied,
    isLoading,
    isCheckingStatus,
    canApply,
    applyToJob,
  }
}
