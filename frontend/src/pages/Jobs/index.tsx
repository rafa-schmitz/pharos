import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { SearchBar } from './components/SearchBar'
import { Card } from './components/Card'
import { useEffect, useMemo, useState } from 'react';
import { search } from '../../services/jobService'
import { Content as Job, QueryParamsJobs } from '../../types/jobs'
import { handleFilterJob } from './utils/handleFilterJob'
import useDebounce from "../../hooks/useDebounce";
import { Pagination } from '@mantine/core';
import { handleBackToTop } from './utils/handleBackToTop'

export const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [action, setAction] = useState('');
  const [input, setInput] = useState('');
  const [orderBy, setOrderBy] = useState<QueryParamsJobs>();
  const [totalPage, setTotalPage] = useState<number>();
  const [loading, setLoading] = useState(false)
  const debounce = useDebounce(input);
  const [page, setPage] = useState(0);


  useEffect(() => {
    search({ page }, orderBy).then(res => {
      setLoading(true)
      setTotalPage(res.totalPages)
      setJobs(res.content)
      setTimeout(() => {
        setLoading(false)
      }, 800);
    })
  }, [orderBy, page])

  useEffect(() => {
    handleBackToTop();
  }, [page])


  const memoJobs = useMemo(() => handleFilterJob({ jobs, action, input })
    .map((job) => <Card key={job.id} {...job} />), [jobs, debounce, action])

  const defaultPage = page === 0 ? 1 : page + 1

  return (
    <>
      <Box
        minH="100vh"
        bg="#0D0221"
      >
        <Flex zIndex={10} justifyContent="center" flexWrap="wrap">
          <Heading
            color="#fff"
            fontSize={50}
            fontWeight='bold'
            padding="50px 0"
            textAlign="center"
            zIndex={2}
          >Busque as melhores vagas!
          </Heading>
        </Flex>
        <Box
          display="flex"
          maxWidth="1220px"
          margin="0 auto"
          justifyContent="space-between"
          padding="0 20px"
          flexDirection={"column"}
          gap={["100px", "100px", "20px"]}
        >
          <SearchBar
            setAction={setAction}
            setInput={setInput}
            setOrderBy={setOrderBy}
          />
          <Box
            display={["flex", "flex", "flex", "grid"]}
            flexDirection={"column"}
            gridTemplateColumns={"1fr 1fr"}
            gap={"20px"}
          >
            {loading ?
              <Spinner
                style={{ position: 'absolute', top: "45vh", left: "50%" }}
                thickness='4px'
                speed='0.65s'
                emptyColor='#fff'
                color='#9b34ef'
                width="60px"
                height="60px"
              /> :
              memoJobs
            }
          </Box>
          
          {!loading && totalPage && totalPage > 1 ? (
            <Flex
              justifyContent="center"
              margin={["0", "0", "0", "50px 0 0"]}
            >
              <Pagination
                defaultValue={defaultPage}
                onChange={event => setPage(event - 1)}
                total={totalPage}
                styles={(theme) => ({
                  control: {
                    '&[data-active]': {
                      backgroundImage: theme.fn.gradient({ from: '#490cb0', to: '#9b34ef' }),
                      border: 0,
                      color: '#fff!important'
                    },
                  },
                })}
              />
            </Flex>
          ): null}

        </Box>
      </Box>
    </>
  )
}