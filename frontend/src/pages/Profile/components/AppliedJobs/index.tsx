import React from "react";
import { Link } from 'react-router-dom';
import { TbClock } from 'react-icons/tb';
import { BsBriefcase } from 'react-icons/bs';
import { MdPlace, MdWork } from 'react-icons/md';
import { AppliedJobs as IAppliedJobs } from "../../../../types/appliedJobs";
import styles from '../../../../pages/Jobs/components/Card/styles.module.css';
import { Card as CardChakra, CardHeader, Flex, Image, Box, Button } from '@chakra-ui/react';
import { formattedSalary } from "../../../../utils/fomattedSalary";
import { formattedGetDate } from "../../../../utils/formattedGetDate";
import { searchAppliedJobsByUserId } from "../../../../services/appliedJobsService";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

interface AppliedJobsProps {
  setShowAppliedJobs: React.Dispatch<React.SetStateAction<boolean>>
  setShowConfigurations: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppliedJobs = ({ setShowAppliedJobs, setShowConfigurations }: AppliedJobsProps) => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = React.useState<IAppliedJobs[]>([]);

  const handleBackButton = (): void => {
    setShowAppliedJobs(false);
    setShowConfigurations(false);
  }

  React.useEffect(() => {
    searchAppliedJobsByUserId()
      .then((res) => setAppliedJobs(res));
  }, []);

  const appliedJobMemo = React.useMemo(() => {
    return appliedJobs?.map((appliedJob) => {
      let today = new Date();
      let createdDate = new Date(appliedJob?.userAppliedJobs?.createdAt).getDate() - today.getDate();

      return (
        <CardChakra
          bg="#0d0221ef"
          width={"100%"}
          margin="0"
          zIndex={2}
          padding="30px"
          borderRadius={10}
          boxShadow="0px 0px 18.4818px #9b34ef, 0px 1.16058px 5.3212px #9b34ef"
          key={appliedJob?.userAppliedJobs?.id}
        >
          <CardHeader
            padding={0}
          >
            <Flex gap="20px" direction={["column", "column", "row"]}>
              <Box minWidth={90} >
                {appliedJob?.userAppliedJobs?.logo
                  ? <Image maxWidth={90} width="100%" src={appliedJob?.userAppliedJobs?.logo?.url} />
                  : <BsBriefcase size={70} color="#fff" />}
              </Box>

              <Flex
                direction="column"
              >
                <Flex direction="column">
                  <h2 className={styles['titlePosition']}>{appliedJob?.userAppliedJobs?.position}</h2>
                  <p className={styles['titleCompany']}>{appliedJob?.userAppliedJobs?.company}</p>
                </Flex>
                <Flex direction="column">
                  <p className={styles['titleCompany']}>Vaga criada por: <Link to={`/profile/user/${appliedJob?.userAppliedJobs?.createdBy?.id}`}>@{appliedJob?.userAppliedJobs?.createdBy?.username}</Link></p>
                </Flex>
                <Flex align="center" justifyContent="space-between" gap="5px" flexWrap="wrap">
                  <Flex align="center" gap="10px">
                    <MdPlace color='#fff' size={20} />
                    <p className={styles['textInfoJobs']}>
                      {appliedJob?.userAppliedJobs?.location?.state}
                    </p>
                  </Flex>
                  <Flex align="center" gap="10px">
                    <MdWork color='#fff' size={20} />
                    <p className={styles['textInfoJobs']}>
                      {appliedJob?.userAppliedJobs?.contractType}
                    </p>
                  </Flex>
                  <Flex align="center" gap="10px">
                    <TbClock color='#fff' size={20} />
                    <p className={styles['textInfoJobs']}>
                      {createdDate >= 0
                        ? "Hoje"
                        : `${formattedGetDate(String(createdDate))} dias atrás`
                      }
                    </p>
                  </Flex>
                  <Flex align="center" gap="10px">
                    <p className={styles['textInfoJobs']}>
                      {formattedSalary(appliedJob?.userAppliedJobs?.salaryCap)}
                    </p>
                  </Flex>
                </Flex>
                <p className={styles['textDescription']}>
                  {appliedJob?.userAppliedJobs?.description}
                </p>
                <Flex
                  gap="20px"
                  justifyContent="space-between"
                  direction={["column", "column", "column", "column", "row"]}
                >
                  <Button
                    width={["100%"]}
                    color="#fff"
                    backgroundPosition="99% 50%"
                    backgroundSize="400% 400%"
                    transition="all 0.5s"
                    padding="20px 50px"
                    border="2px solid transparent"
                    borderRadius="60px"
                    background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
                    _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
                    isDisabled={true}
                  >
                    Vaga aplicada
                  </Button>
                  <Button
                    width={["100%"]}
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
                    onClick={() => navigate(`/job/${appliedJob?.userAppliedJobs.id}`)}
                  >
                    Detalhes da vaga
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
        </CardChakra>
      )
    })
  }, [appliedJobs])

  return (
    <>
      <button className={styles['linkToBack']} onClick={handleBackButton}>
        <IoMdArrowRoundBack size={25} color="#fff" />
        <h2>Voltar</h2>
      </button>

      {!appliedJobMemo?.length
        ? <h1 style={{ fontWeight: "bold", fontSize: "26px", marginTop: "25px" }}>Nenhuma vaga aplicada por este usuário</h1>
      :
        appliedJobMemo
      }
    </>
  )
};
