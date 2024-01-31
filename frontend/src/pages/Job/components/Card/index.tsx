import { Card as CardChakra, CardHeader, Flex, Image, Box, Button, useToast } from '@chakra-ui/react';
import styles from './styles.module.css'
import './styles.css'
import { MdPlace, MdWork } from 'react-icons/md'
import { TbClock } from 'react-icons/tb'
import { BsBriefcase } from 'react-icons/bs'
import { FaClipboardList } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { Content as Job } from '../../../../types/jobs'
import { List } from '@mantine/core';
import { useLayoutEffect, useState } from "react";
import { createAppliedJob, existAppliedJob } from "../../../../services/appliedJobsService";
import { useAuth } from "../../../../context/AuthContext";
import { formattedGetDate } from "../../../../utils/formattedGetDate";
import { formattedSalary } from "../../../../utils/fomattedSalary";

export const Card = (props: Job) => {
  const {
    id,
    company,
    description,
    logo,
    location,
    position,
    contractType,
    salaryCap,
    createdAt,
    seniority,
    requirements
  } = props
  const d = new Date()
  const { isAuthenticated, user: { usertype } } = useAuth()
  const createdDate = new Date(createdAt).getDate() - d.getDate()
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const toast = useToast()

  useLayoutEffect(() => {
    if (!isAuthenticated) return
    existAppliedJob(id)
      .then(res => setIsApplied(res))
  }, [])

  const handleAppliedJob = async () => {
    try {
      if (!isAuthenticated) {
        toast({
          title: 'Você precisa se autenticar',
          status: 'warning',
          duration: 2000,
          position: "top-right"
        })
        setTimeout(() => setIsLoading(false), 1000)
        return
      }
      setIsLoading(true)
      await createAppliedJob(id)
      toast({
        title: 'Vaga aplicada com sucesso!',
        status: 'success',
        duration: 2000,
        position: "top-right"
      })
      setTimeout(() => {
        setIsApplied(true)
        setIsLoading(false)
      }, 1000)
    } catch (error) {

      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: 'Erro ao aplicar na vaga',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  }

  const isAppliedJob = isAuthenticated && isApplied
  const isRecruiter = usertype === 'ROLE_RECRUITER';

  return (
    <CardChakra
      bg="#0d0221ef"
      width={"100%"}
      margin="0"
      zIndex={2}
      padding="30px"
      borderRadius={10}
      boxShadow="0px 0px 18.4818px #9b34ef, 0px 1.16058px 5.3212px #9b34ef"
    >
      <CardHeader
        padding={0}
      >
        <Flex gap="20px" direction={["column", "column", "row"]}>
          <Box minWidth={90} >
            {logo ? <Image maxWidth={90} width="100%" src={logo?.url} />
              : <BsBriefcase size={70} color="#fff" />}
          </Box>

          <Flex
            direction="column"
            width={"100%"}
          >
            <h2 className={styles['titlePosition']}>{position}</h2>
            <p className={styles['titleCompany']}>{company}</p>
            <Flex direction="column" align="flex-start" justifyContent="space-between" gap="15px" flexWrap="wrap">
              <Flex align="center" gap="10px">
                <MdPlace color='#fff' size={20} />
                <p className={styles['textInfoJobs']}>
                  {location.country}, {location.state}, {location.city}
                </p>
              </Flex>
              <Flex align="center" gap="10px">
                <MdWork color='#fff' size={20} />
                <p className={styles['textInfoJobs']}>
                  {seniority} - {contractType}
                </p>
              </Flex>
              <Flex align="center" gap="10px">
                <TbClock color='#fff' size={20} />
                <p className={styles['textInfoJobs']}>
                  {createdDate >= 0 ? "Hoje"
                    :
                    `${formattedGetDate(String(createdDate))} dias atrás`
                  }

                </p>
              </Flex>
              <Flex direction="column" gap="10px">
                <Flex align="center" gap="10px">
                  <FaClipboardList size={20} color="#fff" />
                  <p className={styles['textInfoJobs']}>
                    Requisitos
                  </p>
                </Flex>
                <List
                  size="md"
                >
                  {requirements?.map((requirement, index) => (
                    <List.Item key={index}>{requirement}</List.Item>
                  ))}
                </List>
              </Flex>
              <Flex align="center" gap="10px">
                <GiReceiveMoney size={20} color="#fff" />
                <p className={styles['textInfoJobs']}>
                  {formattedSalary(salaryCap)}
                </p>
              </Flex>
            </Flex>
            <h2 className={styles['titlePositionAboutJob']}>Sobre a vaga</h2>
            <p className={styles['textDescription']}>
              {description}
            </p>
            <Flex
              gap="20px"
              justifyContent="space-between"
              direction={["column", "column", "column", "column", "row"]}
            >
              <Button
                width={["100%", "100%", "195px"]}
                color="#fff"
                backgroundPosition="99% 50%"
                backgroundSize="400% 400%"
                transition="all 0.5s"
                padding="20px 50px"
                border="2px solid transparent"
                borderRadius="60px"
                background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
                _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
                onClick={handleAppliedJob}
                isLoading={loading}
                isDisabled={isAppliedJob || isRecruiter}
                fontSize={14}
              >
                {isAppliedJob ? 'Vaga aplicada' : 'Quero me candidatar'}
              </Button>
            </Flex>

          </Flex>

        </Flex>
      </CardHeader>
    </CardChakra>
  )
}