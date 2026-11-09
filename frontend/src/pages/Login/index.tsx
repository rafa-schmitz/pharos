import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState, useLayoutEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { AuthLayout } from '../../components'
import { useAuth } from '../../context/AuthContext'
import { useAppToast } from '../../hooks'
import { mySelf } from '../../services/userService'

import styles from './styles.module.css'

interface LoginFormInputs {
  username: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const { handleAuthentication, setUser, isAuthenticated, setLoading } = useAuth()
  const navigate = useNavigate()
  const toast = useAppToast()
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('/')
      }, 1000)
    }
  }, [isAuthenticated, setLoading, navigate])

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setIsLoading(true)
      await handleAuthentication(data.username, data.password)
      const user = await mySelf()
      setUser(user)
      toast.success('Login efetuado com sucesso!')
      navigate('/')
    } catch (err) {
      toast.error('Usuário ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Aproveite nossos serviços ao máximo!">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.titleLogin}>Entrar</h2>

        <Stack backgroundColor="white" borderRadius="5px" spacing={4} width="100%">
          <FormControl id="username" isInvalid={!!errors.username}>
            <FormLabel fontSize="14px" color="#000">
              Usuário
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
              {...register('username', {
                required: 'O campo usuário não pode ser vazio',
              })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
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
              autoComplete="off"
              height="32px"
              border="2px solid #d8d8d8"
              borderRadius="5px"
              {...register('password', {
                required: 'O campo senha não pode ser vazio',
                minLength: {
                  value: 6,
                  message: 'O Campo senha deve ter no mínimo 6 caracteres',
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          variant="primary"
          width={['100%', '300px']}
          isLoading={isLoading}
        >
          Entrar
        </Button>

        <p className={styles.alreadyUser}>ou</p>

        <p className={styles.textLogin}>
          Ainda não faz parte da Pharus?
          <Link className={styles.login} to="/signup">
            {' '}
            Cadastre-se{' '}
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
