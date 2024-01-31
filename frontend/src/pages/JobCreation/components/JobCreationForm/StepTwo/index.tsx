import { Select, MultiSelect, Textarea } from '@mantine/core';
import { useJobInfo } from '../../../../../context/JobContext'
import './styles.css'
import React from 'react';

const noOp = (): void => { }

export const JobCreationStepTwo = () => {
  const { jobInfo, setJobInfo } = useJobInfo();

  const [requirementsData, setRequirementsData] = React.useState([
    { value: '', label: '' },
  ]);

  const [seniorityData, setSeniorityData] = React.useState([
    { value: 'Estagiário', label: 'Estagiário' },
    { value: 'Trainee', label: 'Trainee' },
    { value: 'Júnior', label: 'Júnior' },
    { value: 'Pleno', label: 'Pleno' },
    { value: 'Sênior', label: 'Sênior' },
  ]);

  return (
    <form className="formContainer" onSubmit={noOp}>
      <Select
        label="Escolha a senioridade"
        placeholder="Escolher"
        description="escolha a melhor opção para a vaga"
        creatable
        getCreateLabel={(query) => `+ Adicionar "${query}"`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setSeniorityData((current) => [...current, item]);
          return item;
        }}
        clearable
        searchable
        nothingFound="Não encontrado"
        data={seniorityData}
        value={jobInfo?.seniority}
        onChange={(value) => {
          if (value) {
            setJobInfo({ ...jobInfo, seniority: value })
          }
        }}
      />

      <MultiSelect
        label="Estabeleça requisitos"
        placeholder="Ex.: 99 anos de experiência"
        description="(opcional)"
        creatable
        clearable
        searchable
        getCreateLabel={(query) => `+ Adicionar "${query}"`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setRequirementsData((current) => [...current, item]);
          return item;
        }}
        data={requirementsData}
        onChange={(value) => {
          if (value) {
            setJobInfo({ ...jobInfo, requirements: value })
          }
        }}
      />

      <div className="job-description-container">
        <Textarea
          placeholder="Seja criativo e objetivo!"
          label="Insira a descrição completa da sua vaga"
          autosize
          minRows={2}
          maxRows={8}
          withAsterisk
          value={jobInfo?.description}
          onChange={(event) => setJobInfo({ ...jobInfo, description: event.target.value })}
        />
      </div>
    </form>
  )
};
