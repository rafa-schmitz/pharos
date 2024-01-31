import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Image,
  Stack
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../assets/imgs/main-logo.png';
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.css'
import React, { useState, useLayoutEffect } from 'react';
import { mySelf } from '../../services/userService'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

type SignUpFormInputs = {
  username: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const { handleAuthentication, setUser, isAuthenticated, setLoading } = useAuth();
  const navigate = useNavigate()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);
  
  useLayoutEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate("/")
      }, 1000)
      return
    }
  },[isAuthenticated])


  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setIsLoading(true)
      await handleAuthentication(data.username, data.password);
      const user = await mySelf();
      setUser(user)

      return setTimeout(() => {
        setIsLoading(false)
        toast({
          title: 'Login efetuado com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
        navigate("/");
      }, 1000)

    } catch (err) {
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: 'Usuário ou senha incorretos.',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  };

  return (
    <Flex direction={"column"} width={"100%"} minHeight={"100vh"} backgroundColor={"#0D0221"} alignItems={"center"}
      gap={"3vh"}>
      <Flex
        width={"100%"}
        gap={"10px"}
        maxW={"1272px"}
        padding={"22px 22px 0 22px"}
      >
        <Link
          style={{display:'flex', alignItems:'center', gap:10}}
          to="/"
        >
          <Image maxW="90px" maxH="90px" src={logo} alt="logo" />
          <Heading as="h1" fontSize="33px" color="#fff">Pharus</Heading>
        </Link>
      </Flex>

      <Flex direction={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"}>
        <Heading as="h1" fontSize="30px" color="#fff" fontWeight={"medium"} margin="0">Aproveite nossos serviços ao
          máximo!</Heading>

        <form style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "370px",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly"
        }} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.titleLogin}>Entrar</h2>
          <Stack backgroundColor={"white"} borderRadius={"5px"} spacing={4} padding={"0 25px"} width={"100%"}>
            <FormControl id="username" isInvalid={!!errors.username} gap={"25px"}>
              <FormLabel fontSize={"14px"} color={"#000"}>Usuário</FormLabel>
              <Input color={"#000"} outlineColor={"#490cb0"} placeholder="Insira seu nome" type="text" width={"100%"}
                height={"32px"} border={"2px solid #d8d8d8"}
                borderRadius={"5px"} {...register('username', { required: "O campo usuário não pode ser vazio" })}
                className={styles.input} />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel fontSize={"14px"} color={"#000"}>Senha (6 ou mais caracteres)</FormLabel>
              <Input
                color={"#000"} outlineColor={"#490cb0"} placeholder="Crie uma senha" type="password" width={"100%"} autoComplete='off'
                height={"32px"} border={"2px solid #d8d8d8"}
                borderRadius={"5px"}
                {...register('password',
                  {
                    required: "O campo senha não pode ser vazio",
                    minLength: {
                      value: 6, message: "O Campo senha deve ter no minímo 6 caracteres"
                    }
                  })}
                className={styles.input}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <Button
            type='submit'
            width={["100%", "300px"]}
            color="#fff"
            backgroundPosition="99% 50%"
            backgroundSize="400% 400%"
            transition="all 0.5s"
            padding="20px 50px"
            border="2px solid transparent"
            borderRadius="60px"
            background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
            _hover={{ opacity: "0.85" }}
            isLoading={isLoading}
          >
            Entrar
          </Button>

          <p className={styles.alreadyUser}>
            ou
          </p>

          <p className={styles.textLogin}>
            Ainda não faz parte da Pharus?
            <Link className={styles.login} to="/signup"> Cadastre-se </Link>
          </p>
        </form>
      </Flex>
    </Flex>
  );
};
