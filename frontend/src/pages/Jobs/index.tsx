import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { Pagination } from '@mantine/core'

import { JobCard } from '../../components'
import { useDebounce } from '../../hooks'
import { search } from '../../services/jobService'
import { Content as Job, QueryParamsJobs } from '../../types/jobs'
import { tokens } from '../../utils/chakraTheme'

import { SearchBar } from './components/SearchBar'
import { handleFilterJob } from './utils/handleFilterJob'
import { handleBackToTop } from './utils/handleBackToTop'

export const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [action, setAction] = useState('')
  const [input, setInput] = useState('')
  const [orderBy, setOrderBy] = useState<QueryParamsJobs>()
  const [totalPage, setTotalPage] = useState<number>()
  const [loading, setLoading] = useState(false)
  const debounce = useDebounce(input)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setLoading(true)
    search({ page }, orderBy)
      .then((res) => {
        setTotalPage(res.totalPages)
        setJobs(res.content)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [orderBy, page])

  useEffect(() => {
    handleBackToTop()
  }, [page])

  const filteredJobs = useMemo(
    () => handleFilterJob({ jobs, action, input }),
    [jobs, debounce, action]
  )

  const defaultPage = page === 0 ? 1 : page + 1

  return (
    <Box minH="100vh" bg={tokens.colors.background.dark}>
      <Flex zIndex={10} justifyContent="center" flexWrap="wrap">
        <Heading
          color="#fff"
          fontSize={50}
          fontWeight="bold"
          padding="50px 0"
          textAlign="center"
          zIndex={2}
        >
          Busque as melhores vagas!
        </Heading>
      </Flex>

      <Box
        display="flex"
        maxWidth="1220px"
        margin="0 auto"
        justifyContent="space-between"
        padding="0 20px"
        flexDirection="column"
        gap={['100px', '100px', '20px']}
      >
        <SearchBar setAction={setAction} setInput={setInput} setOrderBy={setOrderBy} />

        <Box
          display={['flex', 'flex', 'flex', 'grid']}
          flexDirection="column"
          gridTemplateColumns="1fr 1fr"
          gap="20px"
        >
          {loading ? (
            <Spinner
              style={{ position: 'absolute', top: '45vh', left: '50%' }}
              width="60px"
              height="60px"
            />
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} variant="listing" />
            ))
          )}
        </Box>

        {!loading && totalPage && totalPage > 1 && (
          <Flex justifyContent="center" margin={['0', '0', '0', '50px 0 0']}>
            <Pagination
              defaultValue={defaultPage}
              onChange={(event) => setPage(event - 1)}
              total={totalPage}
              styles={(theme) => ({
                control: {
                  '&[data-active]': {
                    backgroundImage: theme.fn.gradient({ from: '#490cb0', to: '#9b34ef' }),
                    border: 0,
                    color: '#fff!important',
                  },
                },
              })}
            />
          </Flex>
        )}
      </Box>
    </Box>
  )
}