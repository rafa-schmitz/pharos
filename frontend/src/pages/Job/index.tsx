import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Spinner } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { JobCard } from '../../components'
import { getJob } from '../../services/jobService'
import { Content as IJob } from '../../types/jobs'
import { tokens } from '../../utils/chakraTheme'

import styles from './styles.module.css'

export const Job = () => {
  const { id } = useParams()
  const [job, setJob] = useState<IJob>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getJob(id)
      .then((res) => setJob(res))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <Box minH="100vh" bg={tokens.colors.background.dark}>
      <Box
        display="flex"
        maxWidth="1220px"
        margin="0 auto"
        justifyContent="space-between"
        padding="0 20px"
        flexDirection="column"
        gap="50px"
        marginTop="30px"
      >
        <Link className={styles.linkToBack} to="/jobs">
          <IoMdArrowRoundBack size={25} color="#fff" />
          <h2 style={{ fontSize: '20px' }}>Voltar</h2>
        </Link>

        <Box
          display="flex"
          flexDirection="column"
          maxWidth="800px"
          width="100%"
          margin="0 auto"
        >
          {loading ? (
            <Spinner
              style={{ margin: '0 auto' }}
              width="60px"
              height="60px"
            />
          ) : (
            job && <JobCard job={job} variant="detail" />
          )}
        </Box>
      </Box>
    </Box>
  )
}