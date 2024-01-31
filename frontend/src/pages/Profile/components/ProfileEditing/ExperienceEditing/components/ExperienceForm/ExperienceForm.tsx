import React from 'react';
import './styles.css'
import { DatePickerInput } from '@mantine/dates';
import { Group, Input } from "@mantine/core";
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Experience } from '../../../../../../../types/user';
import { MdAddTask, MdCalendarMonth } from 'react-icons/md';
import { StyledButton } from '../../../../StyledButton';

interface FormProps {
  isEditingExperience?: boolean
  control: Control<Experience, any>
  onSubmit: SubmitHandler<Experience>
  register: UseFormRegister<Experience>
  handleSubmit: UseFormHandleSubmit<Experience>
  formErrors: FieldErrors<Experience>
}

export const ExperienceForm = ({ isEditingExperience, control, onSubmit, handleSubmit, register, formErrors }: FormProps) => {
  return (
    <form className='exp-form' onSubmit={handleSubmit(onSubmit)}>
      {
        <div className="experiencesContainer">
          <Input.Wrapper
            id="user-role"
            label="Cargo"
            withAsterisk
            error={formErrors?.position?.message}
          >
            <Input id="input-user-role" placeholder="Insira o cargo" {...register('position', { required: 'Este campo não deve estar vazio' })} />
          </Input.Wrapper>

          <Input.Wrapper
            id="company-name"
            label="Empresa"
            withAsterisk
            error={formErrors?.companyName?.message}
          >
            <Input id="input-company-name" placeholder="Insira o nome da sua empresa" {...register('companyName', { required: 'Este campo não deve estar vazio' })} />
          </Input.Wrapper>

          <Controller
            control={control}
            name='startDate'
            rules={{ required: "Este campo não deve estar vazio!" }}
            render={({ field }) => (
              <DatePickerInput
                icon={<MdCalendarMonth />}
                dropdownType="modal"
                label="Data de início"
                placeholder="Escolha a data"
                value={field?.value}
                onChange={(initialDate) => field?.onChange(initialDate)}
                valueFormat="DD MMM YYYY"
                locale="pt-br"
                maxDate={new Date()}
                modalProps={{ centered: true, }}
                withAsterisk
                error={formErrors?.startDate?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='endDate'
            rules={{ required: "Este campo não deve estar vazio!" }}
            render={({ field }) => (
              <DatePickerInput
                icon={<MdCalendarMonth />}
                dropdownType="modal"
                label="Data de fim"
                placeholder="Escolha a data"
                value={field?.value}
                onChange={(finalDate) => field?.onChange(finalDate)}
                valueFormat="DD MMM YYYY"
                locale="pt-br"
                maxDate={new Date()}
                modalProps={{ centered: true, }}
                withAsterisk
                error={formErrors?.endDate?.message}
              />
            )}
          />

          <Group id="save-exp" position="center" w="100%" p="lg">
            <StyledButton isHbo={true} leftIcon={<MdAddTask />} type="submit" buttonContent={isEditingExperience ? "Editar experiência" : "Cadastrar experiência"} />
          </Group>
        </div>
      }
    </form>
  )
}