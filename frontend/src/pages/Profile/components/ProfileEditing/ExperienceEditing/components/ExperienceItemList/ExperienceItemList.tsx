import React from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import { Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { UseFormSetValue } from 'react-hook-form';
import { StyledButton } from '../../../../StyledButton';
import './styles.css'
import { Experience } from '../../../../../../../types/user';
import { MdDeleteSweep, MdKeyboardBackspace, MdOutlineManageAccounts } from "react-icons/md";

dayjs.extend(utc)
dayjs.locale('pt-br')

interface IProps {
  index: number
  handleDeleteExperience: (id: number) => Promise<void>
  setIsEditingExperience: React.Dispatch<React.SetStateAction<boolean>>
  experience: Experience
  setValue: UseFormSetValue<Experience>
}

export const ExperienceItemList = (props: IProps) => {
  const { experience, index, handleDeleteExperience, setIsEditingExperience, setValue } = props;
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    await handleDeleteExperience(experience?.id);
    close();
  }

  const manageEditState = () => {
    setIsEditingExperience(true);

    setValue('id', experience?.id);
    setValue('position', experience?.position);
    setValue('companyName', experience?.companyName);
    setValue('startDate', dayjs(experience?.startDate).toDate());
    setValue('endDate', dayjs(experience?.endDate).toDate());
  }

  return (
    <li
      key={index}
      className="profileHeader"
    >
      <p className="jobRole">Cargo: <span>{experience?.position}</span></p>
      <p className="company">Empresa: <span>{experience?.companyName}</span></p>
      <p>Período: <span>{dayjs(experience?.startDate).format('LL')} até {dayjs(experience?.endDate).isToday() ? "o presente momento" : dayjs(experience?.endDate).format('LL')}</span></p>

      <Modal opened={opened} onClose={close} centered>
        <Text pb="30px" align="center" color="white">Deseja realmente excluir essa experiência?</Text>

        <Group position="center">
          <StyledButton leftIcon={<MdKeyboardBackspace />} onClick={close} buttonContent="Voltar" />
          <StyledButton isHbo={true} leftIcon={<MdDeleteSweep />} onClick={() => handleDelete()} buttonContent="Excluir" />
        </Group>
      </Modal>

      <Group id='edit-exp' position="center" align="center" w="100%">
        <StyledButton isHbo={true} leftIcon={<MdOutlineManageAccounts />} onClick={manageEditState} buttonContent="Editar experiência" />
        <StyledButton isHbo={true} leftIcon={<MdDeleteSweep />} onClick={open} buttonContent="Excluir experiência" />
      </Group>
    </li>
  )
}