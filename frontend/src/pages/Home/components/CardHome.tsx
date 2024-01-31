import { Image, Card, Flex, Text, Heading, Button } from '@chakra-ui/react';
import infocardImage from '../../../assets/imgs/home/infocard-image.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export const CardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card
      bg="#0D0221"
      direction="row"
      margin="0 auto"
      justifyContent="space-between"
      maxWidth="1220px"
      padding={["0 20px", "40px 20px 0 20px"]}
      flexWrap="wrap"
      boxShadow="unset"
    >
      <Flex direction="column" maxWidth={["100%", "60%"]} zIndex={2}>
        <Heading as="h1" color="#fff" fontSize="48px">Encontre sua vaga dos sonhos aqui!</Heading>
        <Text color="#fff" fontSize="16px">Faça parte da nossa comunidade de profissionais talentosos</Text>
        <Text color="#fff" fontSize="16px">Candidatos qualificados a apenas um clique de distância.</Text>
        <Flex marginTop="50px" gap="30px" wrap="wrap">
          <Button
            width={["100%", "300px"]}
            color="#fff"
            backgroundPosition="99% 50%"
            backgroundSize="400% 400%"
            transition="all 0.5s"
            padding="20px 50px"
            border="2px solid transparent"
            borderRadius="60px"
            background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
            _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
            onClick={() => navigate('/jobs')}
          >
            Buscar vagas
          </Button>

          {user?.usertype === "ROLE_RECRUITER" &&
            <Button
              width={["100%", "300px"]}
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
              onClick={() => navigate('/jobs/creation')}
            >
              Criar vagas
            </Button>
          }

        </Flex>
      </Flex>
      <Image zIndex="1" src={infocardImage} margin={["30px auto 0 auto", "initial"]} />
    </Card>
  )
}