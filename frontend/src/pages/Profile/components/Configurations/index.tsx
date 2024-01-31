import {FileInput, Group, Input, LoadingOverlay, Modal, PasswordInput, Text} from "@mantine/core";
import { useForm } from "react-hook-form";
import {MdAddTask, MdDeleteSweep, MdKeyboardBackspace} from "react-icons/md";
import { StyledButton } from "../StyledButton";
import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import { FiUpload } from "react-icons/fi";
import { ConfigurationForm } from "./form";
import { useAuth } from "../../../../context/AuthContext";
import { updateUser, updateFileUser, uploadFileUser, updatePasswordUser } from "../../../../services/userService";
import { useToast } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {deleteUser} from "../../../../services/userService";
import {useDisclosure} from "@mantine/hooks";

interface ConfigurationProps {
  setShowAppliedJobs: React.Dispatch<React.SetStateAction<boolean>>
  setShowConfigurations: React.Dispatch<React.SetStateAction<boolean>>
}

export const Configurations = ({setShowAppliedJobs, setShowConfigurations}: ConfigurationProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset
  } = useForm<ConfigurationForm>()

  useEffect(() => {
    setValue("name", user?.name)
    setValue("email", user?.email)
    setValue("lastName", user?.lastName)
  }, [])

  const { user, setUser, handleLogout } = useAuth()
  const [isNewPassword, setIsNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [opened, { open, close , toggle}] = useDisclosure(false);
  const handleOnNewPassword = () => setIsNewPassword(prev => !prev)
  const handleBackButton = (): void => {
    setShowAppliedJobs(false);
    setShowConfigurations(false);
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      handleLogout();
    }
    catch (error){
      setTimeout(() => {
        toast({
          title: 'Erro ao tentar excluir a conta',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
    finally {
      toggle();
    }
  }

  const onSubmit = async (data: ConfigurationForm) => {
    try {
      setLoading(true)
      const {
        email,
        name,
        lastName,
        photo,
        oldPassword,
        newPassword
      } = data

      const updatedUser = await updateUser({
        ...user,
        email,
        name,
        lastName
      });

      let newUser = updatedUser;
      if (photo) {
        const updatedFile = user.photo
          ? await updateFileUser(photo)
          : await uploadFileUser(photo)

        newUser.photo = updatedFile;
      }

      if (newPassword && oldPassword) await updatePasswordUser({
        oldPassword,
        newPassword
      })

      setTimeout(() => {
        setUser(newUser)
        reset({
          newPassword: "",
          oldPassword: ""
        })
        toast({
          title: 'Dados atualizados com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
        setLoading(false)
      }, 1000)
    }
    catch (error) {
      setTimeout(() => {
        toast({
          title: 'Erro ao tentar atualizar',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
        setLoading(false)
      }, 1000)
    }
  }
  return (
    <form className={styles['configForm']} onSubmit={handleSubmit(onSubmit)}>
      <button className={styles['linkToBack']} onClick={handleBackButton}>
        <IoMdArrowRoundBack size={25} color="#fff" />
        <h2>Voltar</h2>
      </button>

      <div className="experiencesContainer">
        <Input.Wrapper
          id="user-name"
          label="Nome"
          withAsterisk
        >
          <Input id="input-user-name"
            placeholder="Insira o seu nome" {...register('name', { required: "O campo nome não pode ser vazio" })} />
        </Input.Wrapper>

        <Input.Wrapper
          id="user-lastname"
          label="Sobrenome"
          withAsterisk
        >
          <Input id="input-user-lastname"
            placeholder="Insira o seu sobrenome" {...register('lastName')} />
        </Input.Wrapper>

        <Input.Wrapper
          id="user-email"
          label="E-mail"
          withAsterisk
        >
          <Input id="input-user-email" type="email"
            placeholder="Insira o seu E-mail" {...register('email', { required: "O campo email não pode ser vazio" })} />
        </Input.Wrapper>

        <Input.Wrapper
          id="user-photo"
          label="Foto de perfil"
          withAsterisk
        >
          <FileInput
            style={{ width: "100%" }}
            icon={<FiUpload color="#fff" size={15} />}
            placeholder="Insira um arquivo"
            {...register('photo')}
            onChange={file => {
              if (!file) return
              setValue('photo', file)
            }}
          />
        </Input.Wrapper>

        {isNewPassword &&
          <>
            <Input.Wrapper
              id="user-password"
              label="Senha"
              withAsterisk
            >
              <PasswordInput autoComplete="" id="input-password" placeholder="Insira sua senha" {...register('oldPassword')} />
            </Input.Wrapper>

            <Input.Wrapper
              id="user-new-password"
              label="Nova senha"
              withAsterisk
            >
              <PasswordInput autoComplete="" id="input-new-password" placeholder="Insira sua nova senha" {...register('newPassword')} />
            </Input.Wrapper>
          </>
        }

        <Group id="save-exp" position="center" w="100%" p="lg">
          <StyledButton onClick={open} buttonContent={"Excluir conta"} />
          <StyledButton onClick={handleOnNewPassword} buttonContent={isNewPassword ? "Fechar" : "Alterar senha"} />
          <StyledButton isLoading={loading} leftIcon={<MdAddTask />} isHbo={true} type="submit" buttonContent={"Editar"} />
        </Group>
      </div>
      <Modal opened={opened} onClose={close} centered>
        <Text pb="30px" align="center" color="white">Deseja realmente excluir essa conta?</Text>

        <Group position="center">
          <StyledButton leftIcon={<MdKeyboardBackspace />} onClick={close} buttonContent="Voltar" />
          <StyledButton isHbo={true} leftIcon={<MdDeleteSweep />} onClick={handleDeleteAccount} buttonContent="Excluir" />
        </Group>
      </Modal>
    </form>
  )
}