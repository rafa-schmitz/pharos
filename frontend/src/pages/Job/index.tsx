import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from './components/Card';
import { getJob } from "../../services/jobService";
import { Content as IJob } from "../../types/jobs";
import { Box } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './styles.module.css';

export const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState<IJob>();

  useEffect(() => {
    if (!id) return
    getJob(id).then(res => setJob(res))
  }, [id])

  return (
    <>
      <Box
        minH="100vh"
        bg="#0D0221"
      >
        <Box
          display="flex"
          maxWidth="1220"
          margin="0 auto"
          justifyContent="space-between"
          padding="0 20px"
          flexDirection={"column"}
          gap="50px"
          marginTop="30px"
        >
          <Link className={styles['linkToBack']} to="/jobs">
            <IoMdArrowRoundBack size={25} color="#fff" />
            <h2 style={{fontSize: "20px"}}>Voltar</h2>
          </Link>
          <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth="800px"
            width="100%"
            margin="0 auto"
          >
            {job && <Card {...job} />}
          </Box>
        </Box>
      </Box>
    </>
  )
}