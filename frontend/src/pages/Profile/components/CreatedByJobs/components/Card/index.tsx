import { Card as CardChakra, CardHeader, Flex, Image, Box, Button } from '@chakra-ui/react';
import styles from './styles.module.css';
import { MdDeleteSweep, MdKeyboardBackspace, MdPlace, MdWork } from 'react-icons/md';
import { TbClock } from 'react-icons/tb';
import { BsBriefcase, BsTrash3Fill } from 'react-icons/bs';
import { Content as Job } from '../../../../../../types/jobs';
import { useNavigate } from 'react-router-dom';
import { createAppliedJob } from "../../../../../../services/appliedJobsService";
import { useAuth } from "../../../../../../context/AuthContext";
import { useToast } from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from "react";
import { formattedGetDate } from "../../../../../../utils/formattedGetDate";
import { formattedSalary } from "../../../../../../utils/fomattedSalary";
import { existAppliedJob } from "../../../../../../services/appliedJobsService";
import { Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import { StyledButton } from "../../../StyledButton";
import { useDisclosure } from "@mantine/hooks";
import { deletejob } from "../../../../../../services/jobService";

interface ICard {
  handleFilterJobs: (id: number) => void
}
export const Card = (props: Job & ICard) => {
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
    createdBy,
    handleFilterJobs
  } = props
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();
  const [isApplied, setIsApplied] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const isAppliedJob = isAuthenticated && isApplied;
  const isRecruiter = user?.usertype === 'ROLE_RECRUITER';
  const d = new Date()
  const createdDate = new Date(createdAt).getDate() - d.getDate();

  useLayoutEffect(() => {
    try {
      if (!isAuthenticated) return
      existAppliedJob(id)
        .then(res => setIsApplied(res))
    } catch (err) { }
  }, [])

  const handleDeleteJob = async () => {
    try {
      setIsLoading(true)
      await deletejob(id)
      setTimeout(() => {
        setIsLoading(false)
        handleFilterJobs(id)
        toast({
          title: 'Vaga excluída com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
    catch (error) {
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: 'Erro ao excluir a vaga',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
    finally {
      toggle()
    }
  }

  const handleAppliedJob = async () => {
    try {
      if (!isAuthenticated) {
        toast({
          title: 'Você precisa se autenticar',
          status: 'warning',
          duration: 2000,
          position: "top-right"
        })
        return
      }
      setIsLoading(true)
      await createAppliedJob(id)
      setTimeout(() => {
        setIsLoading(false)
        setIsApplied(true)
        toast({
          title: 'Vaga aplicada com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
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

  return (
    <CardChakra
      bg="#0d0221ef"
      width={"100%"}
      margin="0"
      zIndex={2}
      padding="30px"
      borderRadius={10}
      boxShadow="0px 0px 12.4818px #9b34ef, 0px 1.16058px 5.3212px #9b34ef"
      position="relative"
    >
      <LoadingOverlay visible={loading} overlayBlur={3} overlayColor="#0D022105" overlayOpacity={0.01} />
      <CardHeader
        padding={0}
      >
        <Flex gap="20px" direction={["column", "column", "row"]}>
          <Box minWidth={90}>
            {logo ? <Image maxWidth={90} width="100%" src={logo?.url} />
              : <BsBriefcase size={70} color="#fff" />}
          </Box>

          <Flex
            direction="column"
            width={"100%"}
          >
            <Flex
              justifyContent={"space-between"}
            >
              <h2 className={styles['titlePosition']}>{position}</h2>
              {user?.id === createdBy.id
                ?
                <button onClick={open} style={{ width: 'fit-content' }}>
                  <BsTrash3Fill color="#fff" size={20} />
                </button>
                :
                null
              }

            </Flex>

            <p className={styles['titleCompany']}>{company}</p>
            <Flex align="center" justifyContent="space-between" gap="5px" flexWrap="wrap">
              <Flex align="center" gap="10px">
                <MdPlace color='#fff' size={20} />
                <p className={styles['textInfoJobs']}>
                  {location.state}
                </p>
              </Flex>
              <Flex align="center" gap="10px">
                <MdWork color='#fff' size={20} />
                <p className={styles['textInfoJobs']}>
                  {contractType}
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
              <Flex align="center" gap="10px">
                <p className={styles['textInfoJobs']}>
                  {formattedSalary(salaryCap)}
                </p>
              </Flex>
            </Flex>
            <p className={styles['textDescription']}>
              {description}
            </p>
            <Flex
              gap="20px"
              justifyContent="space-between"
              direction={["column", "column", "column", "column", "row"]}
            >
              <Button
                width={["100%", "100%", "100%", "100%", "195px"]}
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
                isDisabled={isAppliedJob || isRecruiter}
                isLoading={loading}
              >
                {isAppliedJob ? 'Vaga aplicada' : 'Quero me candidatar'}
              </Button>
              <Button
                width={["100%", "100%", "100%", "100%", "195px"]}
                padding="20px 50px"
                borderRadius="60px"
                color="#fff"
                transition="all 0.5s"
                backgroundPosition="0%"
                backgroundSize="400% 400%"
                overflow="hidden"
                border="2px solid #fff"
                background="linear-gradient( 345deg, #fff 0%, #fff 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
                _hover={{ backgroundPosition: "99% 50%", color: "#0D0221" }}
                onClick={() => navigate(`/job/${id}`)}
              >
                Detalhes da vaga
              </Button>
            </Flex>

          </Flex>

        </Flex>
      </CardHeader>

      <Modal opened={opened} onClose={close} centered>
        <Text pb="30px" align="center" color="white">Deseja realmente excluir essa vaga?</Text>

        <Group position="center">
          <StyledButton leftIcon={<MdKeyboardBackspace />} onClick={close} buttonContent="Voltar" />
          <StyledButton isHbo={true} leftIcon={<MdDeleteSweep />} onClick={handleDeleteJob} buttonContent="Excluir" />
        </Group>
      </Modal>
    </CardChakra>
  )
}