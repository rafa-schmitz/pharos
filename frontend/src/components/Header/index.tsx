import React from "react";
import { Box, Flex, Link, Image, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import eclipse from '../../assets/imgs/Ellipse 9.png'
import logo from '../../assets/imgs/main-logo.png';
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { MenuDropdown } from '../MenuDropdown'
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isRecruiter = user.usertype === 'ROLE_RECRUITER';

  return (
    <Box bg="#0D0221">
      <Flex w="100%" padding="25px 20px" justifyContent={["space-around", "space-between"]} alignItems="center"
        maxWidth="1220px" margin="0 auto" flexWrap="wrap">
        <Box onClick={() => navigate("/")} cursor="pointer" zIndex="10" display="flex" alignItems="center"
          gap={["initial", "15px"]}>
          <Image maxW="80px" src={logo} alt="logo" />
          <Heading as="h1" fontSize="40px" color="#fff">Pharus</Heading>
          {isMobile && <MenuDropdown />}
        </Box>
        <Box display="flex" gap="40px" alignItems="center" zIndex="10" flexWrap="wrap">
          <Link onClick={() => navigate("/jobs")} cursor="pointer" color="#fff" fontSize="16px" fontWeight="semibold">
            Buscar vagas
          </Link>
          {isRecruiter &&
            <Link onClick={() => navigate("/jobs/creation")} cursor="pointer" color="#fff" fontSize="16px"
              fontWeight="semibold">
              Criar vagas
            </Link>
          }
          <Link color="#fff" cursor="pointer" fontSize="16px" fontWeight="semibold">
            Sobre nós
          </Link>
          {!isMobile && <MenuDropdown />}
        </Box>
        <Image width={["70%", "60%", "622px"]} src={eclipse} zIndex="1" position="absolute" top="0" right="0" />
      </Flex>
    </Box>
  )
}