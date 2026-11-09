import { useEffect, useMemo, useState, useCallback } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'

import { JobCard } from '../../../../components'
import { Content } from '../../../../types/jobs'
import { search } from '../../../../services/jobService'
import { useAuth } from '../../../../context/AuthContext'

import './styles.css'

interface CreatedByJobsProps {
  id?: number
}

export const CreatedByJobs = ({ id }: CreatedByJobsProps) => {
  const { user } = useAuth()
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<Content[]>([])

  const userId = id ?? user?.id

  useEffect(() => {
    search({ page, userId }, 'searchJobsByUserId').then((res) => setJobs(res.content))
  }, [userId])

  const handleDeleteJob = useCallback((deletedId: number) => {
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== deletedId))
  }, [])

  const handleSeeMore = async () => {
    try {
      setLoading(true)
      const nextPage = page + 1
      const response = await search({ page: nextPage, userId }, 'searchJobsByUserId')
      setPage(nextPage)
      setJobs((prev) => [...prev, ...response.content])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const jobCards = useMemo(
    () =>
      jobs.map((job) => (
        <JobCard key={job.id} job={job} variant="managed" onDelete={handleDeleteJob} />
      )),
    [jobs, handleDeleteJob]
  )

  return (
    <div className="containerJobCreatedByUserId" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      {!jobCards.length ? (
        <Heading as="h2" fontWeight="bold" fontSize="26px" marginTop="25px" color="white">
          Nenhuma vaga criada por este usuário
        </Heading>
      ) : (
        jobCards
      )}

      <Flex justifyContent="center" margin={['0', '0', '0', '50px 0 0']}>
        <Button
          variant="primary"
          maxWidth={['100%', '100%', '100%', '295px']}
          isLoading={loading}
          onClick={handleSeeMore}
        >
          Ver mais
        </Button>
      </Flex>
    </div>
  )
}