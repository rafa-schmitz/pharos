import React, { useMemo, useState } from "react";
import { Button, Flex } from '@chakra-ui/react'
import { Content } from "../../../../types/jobs";
import { search } from "../../../../services/jobService";
import { useAuth } from "../../../../context/AuthContext";
import { Card } from './components/Card'
import './styles.css'

interface IProps {
  id?: number
}

export const CreatedByJobs = ({ id }: IProps) => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = React.useState<Content[]>([]);

  React.useEffect(() => {
    search({ page, userId: id ?? user?.id }, 'searchJobsByUserId')
      .then((res) => setJobs(res.content));
  }, [])

  const handleFilterJobs = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id))
  }

  const handleSeeMore = async () => {
    try {
      setLoading(true)
      setPage(prev => prev + 1)
      const jobs = await search({ page: page + 1, userId: id ?? user?.id }, 'searchJobsByUserId')
      setTimeout(() => {
        setLoading(false)
        setJobs(prev => [...prev, ...jobs.content])
      }, 1000)
    }
    catch (error) {
      console.error(error)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  const memoJobs = useMemo(() => jobs.map((job) => <Card handleFilterJobs={handleFilterJobs} key={job.id} {...job} />), [jobs])

  return (
    <div className="containerJobCreatedByUserId" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      {!memoJobs.length
        ?
        <h1 style={{ fontWeight: "bold", fontSize: "26px", marginTop: "25px" }}>Nenhuma vaga criada por este usuário</h1>
        : memoJobs}

      <Flex
        justifyContent="center"
        margin={["0", "0", "0", "50px 0 0"]}
      >
        <Button
          maxWidth={["100%", "100%", "100%", "295px"]}
          color="#fff"
          backgroundPosition="99% 50%"
          backgroundSize="400% 400%"
          transition="all 0.5s"
          padding="20px 50px"
          border="2px solid transparent"
          borderRadius="60px"
          background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
          _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
          fontSize={14}
          isLoading={loading}
          onClick={() => handleSeeMore()}
        >
          Ver mais
        </Button>
      </Flex>
    </div>
  )

}