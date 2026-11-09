import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Switch,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components'
import { useAppToast } from '../../hooks'
import { SignUpFormInputs } from '../../types/form'
import { saveUser } from '../../services/userService'

import styles from './styles.module.css'

export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const toast = useAppToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>()

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setLoading(true)
      const { email, isRecruiter, password, username, name } = data

      const body = {
        username,
        name,
        password,
        email,
        usertype: isRecruiter ? 'ROLE_RECRUITER' : 'ROLE_USER',
      }

      await saveUser(body)
      toast.success('Cadastro efetuado com sucesso!')
      navigate('/login')
    } catch (error) {
      toast.error('Ocorreu um erro ao efetuar o cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Aproveite nossos serviços ao máximo!">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom="10px" backgroundColor="white" borderRadius="5px" spacing={4} width="100%">
          <h2 className={styles.titleLogin}>Cadastre-se</h2>

          <FormControl id="username" isInvalid={!!errors.username}>
            <FormLabel fontSize="14px" color="#000">
              Usuário
            </FormLabel>
            <Input
              color="#000"
              focusBorderColor="#490cb0"
              placeholder="Insira seu usuário"
              type="text"
              width="100%"
              height="32px"
              border="2px solid #d8d8d8"
              borderRadius="5px"
              {...register('username', { required: 'O campo não pode ser vazio' })}
            />
            <FormErrorMessage fontSize={12}>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel fontSize="14px" color="#000">
              Nome
            </FormLabel>
            <Input
              color="#000"
              focusBorderColor="#490cb0"
              placeholder="Insira seu nome"
              type="text"
              width="100%"
              height="32px"
              border="2px solid #d8d8d8"
              borderRadius="5px"
              {...register('name', { required: 'O campo não pode ser vazio' })}
            />
            <FormErrorMessage fontSize={12}>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel fontSize="14px" color="#000">
              E-mail
            </FormLabel>
            <Input
              color="#000"
              focusBorderColor="#490cb0"
              placeholder="Insira seu e-mail"
              type="email"
              width="100%"
              height="32px"
              border="2px solid #d8d8d8"
              borderRadius="5px"
              {...register('email', { required: 'O campo não pode ser vazio' })}
            />
            <FormErrorMessage fontSize={12}>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel fontSize="14px" color="#000">
              Senha (6 ou mais caracteres)
            </FormLabel>
            <Input
              color="#000"
              focusBorderColor="#490cb0"
              placeholder="Crie uma senha"
              type="password"
              width="100%"
              height="32px"
              border="2px solid #d8d8d8"
              borderRadius="5px"
              autoComplete="off"
              {...register('password', {
                required: 'O campo não pode ser vazio',
                minLength: { value: 6, message: 'O Campo senha deve ter no mínimo 6 caracteres' },
              })}
            />
            <FormErrorMessage fontSize={12}>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <FormControl display="flex" alignItems="center">
          <FormLabel color="#000" fontSize="14px" fontWeight={500} htmlFor="isRecruiter" mb="0">
            Deseja recrutar profissionais?
          </FormLabel>
          <Switch
            id="isRecruiter"
            colorScheme="purple"
            defaultChecked={false}
            {...register('isRecruiter', { required: false })}
          />
        </FormControl>

        <Button type="submit" variant="primary" width={['100%', '300px']} isLoading={loading}>
          Cadastre-se
        </Button>

        <p className={styles.alreadyUser}>ou</p>

        <p className={styles.textLogin}>
          Já se cadastrou?
          <Link to="/login" className={styles.login}>
            {' '}
            Entre
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}