import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Image,
  Stack,
  Switch
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../assets/imgs/main-logo.png';
import styles from './styles.module.css'
import { SignUpFormInputs } from '../../types/form'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser } from '../../services/userService'
import { useToast } from '@chakra-ui/react'

export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setLoading(true)
      const { email, isRecruiter, password, username, name } = data

      const body = {
        username,
        name,
        password,
        email,
        usertype: isRecruiter ? 'ROLE_RECRUITER' : 'ROLE_USER'
      }

      await saveUser(body)

      return setTimeout(() => {
        setLoading(false)
        toast({
          title: 'Cadastro efetuado com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
        navigate("/login");
      }, 1000)
    } 
    catch (error) {
      setTimeout(() => {
        setLoading(false)
        toast({
          title: 'Ocorreu um erro ao efetuar o cadastro',
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
        <Heading as="h1" fontSize="30px" color="#fff" fontWeight={"medium"} margin="0">Aproveite nossos serviços ao máximo!</Heading>

        <form style={{ gap: "10px", padding: "25px", backgroundColor: "white", borderRadius: "12px", width: "100%", maxWidth: "370px", minHeight: "500px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }} onSubmit={handleSubmit(onSubmit)}>
          <Stack marginBottom={"10px"} backgroundColor={"white"} borderRadius={"5px"} spacing={4} width={"100%"}>
            <h2 className={styles.titleLogin}>Cadastre-se</h2>

            <FormControl id="username" isInvalid={!!errors.username} gap={"25px"}>
              <FormLabel fontSize={"14px"} color={"#000"}>Usuário</FormLabel>
              <Input
                color={"#000"}
                outlineColor={"#490cb0"}
                placeholder="Insira seu usuário" type="text" width={"100%"} height={"32px"}
                border={"2px solid #d8d8d8"} borderRadius={"5px"} {...register('username', { required: 'O campo não pode ser vazio' })}
                className={styles.input}
              />
              <FormErrorMessage fontSize={12}>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="name" isInvalid={!!errors.name} gap={"25px"}>
              <FormLabel fontSize={"14px"} color={"#000"}>Nome</FormLabel>
              <Input
                color={"#000"}
                outlineColor={"#490cb0"}
                placeholder="Insira seu usuário" type="text" width={"100%"} height={"32px"}
                border={"2px solid #d8d8d8"} borderRadius={"5px"} {...register('name', { required: 'O campo não pode ser vazio' })}
                className={styles.input}
              />
              <FormErrorMessage fontSize={12}>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel fontSize={"14px"} color={"#000"}>E-mail</FormLabel>
              <Input
                color={"#000"}
                outlineColor={"#490cb0"}
                placeholder="Insira seu e-mail"
                type="email" width={"100%"}
                height={"32px"} border={"2px solid #d8d8d8"}
                borderRadius={"5px"} {...register('email', { required: 'O campo não pode ser vazio' })} className={styles.input} />
              <FormErrorMessage fontSize={12}>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel fontSize={"14px"} color={"#000"}>Senha (6 ou mais caracteres)</FormLabel>
              <Input
                color={"#000"}
                outlineColor={"#490cb0"}
                placeholder="Crie uma senha"
                type="password"
                width={"100%"}
                height={"32px"}
                border={"2px solid #d8d8d8"}
                borderRadius={"5px"}
                autoComplete='off'
                {...register('password',
                  {
                    required: 'O campo não pode ser vazio',
                    minLength: { value: 6, message: 'O Campo senha deve ter no minímo 6 caracteres' }
                  })} className={styles.input}
              />
              <FormErrorMessage fontSize={12}>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <FormControl display='flex' alignItems='center'>
            <FormLabel color={"#000"} fontSize="14px" fontWeight={500} htmlFor='isRecuiter' mb='0'>
              Deseja recrutar profissionais?
            </FormLabel>
            <Switch id="isRecruiter" colorScheme="purple" defaultChecked={false} {...register('isRecruiter', { required: false })} />
          </FormControl>
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
            isLoading={loading}
          >
            Cadastre-se
          </Button>

          <p className={styles.alreadyUser}>
            ou
          </p>

          <p className={styles.textLogin}>
            Já se cadastrou?
            <Link to="/login" className={styles.login}> Entre</Link>
          </p>
        </form>
      </Flex>
    </Flex>
  );
};