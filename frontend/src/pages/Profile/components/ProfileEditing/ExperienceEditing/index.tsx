import React from "react";
import "./styles.css";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import { useToast } from '@chakra-ui/react';
import { Experience } from "../../../../../types/user";
import { useAuth } from "../../../../../context/AuthContext";
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUserExperience, deleteUserExperience, updateUserExperience } from "../../../../../services/userService";
import { ExperienceForm } from "./components/ExperienceForm/ExperienceForm";
import { ExperienceItemList } from "./components/ExperienceItemList/ExperienceItemList";
import { Box, Group, LoadingOverlay } from "@mantine/core";
import { MdBadge, MdKeyboardBackspace } from "react-icons/md";
import { StyledButton } from "../../StyledButton";

dayjs.extend(isToday);
dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

export const UserExperiences = () => {
  const toast = useToast();
  const { user, setUser } = useAuth();
  const { control, register, handleSubmit, setValue, reset, formState: { errors }, } = useForm<Experience>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [isEditingExperience, setIsEditingExperience] = React.useState<boolean>(false);
  const [isCreatingExperience, setIsCreatingExperience] = React.useState<boolean>(false);

  const handleCreateExperience = async (params: Experience) => {
    if (!user?.experience) return

    try {
      setLoading(true);
      const updateExpRes = await addUserExperience(params);
      const newExperience: Experience[] = [
        ...user?.experience,
        updateExpRes
      ];

      setUser({ ...user, experience: newExperience });

      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Experiência salva!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        });
      }, 1000);

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Erro ao salvar experiência!',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000);
    }
  }

  const handleDeleteExperience = async (id: number) => {
    try {
      setLoading(true);
      await deleteUserExperience(id);
      const experienceRemovalFromContext = user?.experience?.filter((exp: Experience) => exp?.id !== id);
      setUser({ ...user, experience: experienceRemovalFromContext });

      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Experiência excluída!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        });
      }, 1000);

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Erro ao remover experiência!',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  };

  const handleEditExperience: SubmitHandler<Experience> = async (data) => {
    if (!user?.experience) return

    try {
      setLoading(true);
      const updateExperiences = await updateUserExperience(data?.id, data);
      const experienceEditingInContext = user?.experience?.filter((exp: Experience) => exp?.id !== data?.id);
      const newExperience: Experience[] = [
        ...experienceEditingInContext,
        updateExperiences
      ];
      setUser({ ...user, experience: newExperience });

      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Experiência atualizada!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        });
      }, 1000);

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Erro ao editar experiência!',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  };

  const handleSubmitCreateExperience: SubmitHandler<Experience> = (data) => {
    handleCreateExperience(data);
    reset();
  };

  return (
    <>
      <Box w="100%" pos="relative">
        <LoadingOverlay visible={loading} overlayBlur={3} overlayColor="#0D022105" overlayOpacity={0.01} />
        <ul>
          {
            !user?.experience?.length &&
            <p>Nenhuma experiência cadastrada</p>
          }
          {isEditingExperience ?
            <>
              <ExperienceForm
                control={control}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={handleEditExperience}
                isEditingExperience={isEditingExperience}
                formErrors={errors}
              />
              <Group position="center">
                <StyledButton
                  leftIcon={<MdKeyboardBackspace />}
                  onClick={() => setIsEditingExperience(false)}
                  buttonContent="Voltar"
                />
              </Group>
            </>

            : user?.experience?.map((experience: Experience, index: number) => (
              <ExperienceItemList
                key={index}
                index={index}
                setValue={setValue}
                experience={experience}
                handleDeleteExperience={handleDeleteExperience}
                setIsEditingExperience={setIsEditingExperience} />
            ))}
        </ul>

        {isCreatingExperience &&
          <ExperienceForm
            control={control}
            handleSubmit={handleSubmit}
            register={register}
            isEditingExperience={isEditingExperience}
            onSubmit={handleSubmitCreateExperience}
            formErrors={errors}
          />
        }

        {!isEditingExperience &&
          <Group w="100%" p="lg" >
            <StyledButton
              isHbo={isCreatingExperience ? false : true}
              leftIcon={isCreatingExperience ? <MdKeyboardBackspace /> : <MdBadge />}
              onClick={() => {
                reset();
                setIsCreatingExperience((prev) => !prev)
              }}
              buttonContent={isCreatingExperience ? "Voltar" : "Adicionar experiência"}
            />
          </Group>
        }
      </Box>
    </>
  );
};