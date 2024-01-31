import React from 'react';
import { Select, Input } from '@mantine/core';
import './styles.css'
import { useJobInfo } from '../../../../../context/JobContext'
import { useEffect } from "react";
import axios from "axios";
import { Address } from "../../../../../types/address";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../../../hooks/useDebounce";

export const JobCreationStepOne = () => {
  const toast = useToast()
  const { jobInfo, setJobInfo } = useJobInfo();
  const [cep, setCep] = React.useState<string>('');
  const [data, setData] = React.useState([
    { value: 'Back-end', label: 'Back-end' },
    { value: 'Front-end', label: 'Front-end' },
    { value: 'Desenvolvedor(a) Full Stack', label: 'Desenvolvedor(a) Full Stack' },
    { value: 'Engenheiro(a) de Software', label: 'Engenheiro(a) de Software' },
  ]);

  const debounce = useDebounce(cep);
  const handleGetAddress = async () => {
    if (cep.length !== 8) {
      setJobInfo({ ...jobInfo, location: { city: '', country: '', state: '' } })
      return
    }
    const address: Address = await (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data
    if (!address.localidade || !address.uf) {
      toast({
        title: 'Digite um cep válido',
        status: 'error',
        duration: 1000,
        position: "top-right"
      })
      return
    }
    setJobInfo({ ...jobInfo, location: { city: address.localidade, country: 'Brasil', state: address.uf } })
  }

  useEffect(() => { handleGetAddress() }, [debounce])

  return (
    <form className="formContainer">
      <Input.Wrapper
        id="input-company-name"
        label="Qual é o nome da sua empresa?"
        description="sua empresa aparecerá no card de vaga"
      >
        <Input
          id="input-company-name"
          placeholder="Insira o nome da sua empresa"
          value={jobInfo?.company}
          onChange={(event: any) => setJobInfo({ ...jobInfo, company: event.target.value })} />
      </Input.Wrapper>

      <Select
        label="Escolha a área"
        placeholder="Escolher"
        description="Escolha a área pertencente a vaga"
        creatable
        clearable
        searchable
        nothingFound="Não encontrado"
        getCreateLabel={(query) => `+ Adicionar "${query}"`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setData((current) => [...current, item]);
          return item;
        }}
        data={data}
        selectOnBlur={false}
        value={jobInfo?.role}
        onChange={(value) => {
          if (value) {
            setJobInfo({ ...jobInfo, role: value })
          }
        }}
      />

      <Select
        label="Escolha o modelo de contratação"
        placeholder="Escolher"
        description="escolha a opção :)"
        clearable
        searchable
        nothingFound="Não encontrado"
        data={['Remoto', 'Presencial', 'Híbrido']}
        value={jobInfo?.contractType}
        onChange={(value) => {
          if (value) {
            setJobInfo({ ...jobInfo, contractType: value })
          }
        }}
      />

      <Input.Wrapper
        id="input-cep"
        label="Em qual cep está localizada sua empresa?"
        description="sua localização aparecerá no card de vaga"
      >
        <Input
          id="input-cep"
          placeholder="Ex.: 88067-880"
          value={cep}
          maxLength={8}
          onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setCep(event.target.value)}
        />
      </Input.Wrapper>

      <Input.Wrapper
        id="input-company-city"
        label="Em qual cidade está localizada sua empresa?"
        description="sua localização aparecerá no card de vaga"
      >
        <Input
          id="input-company-location"
          placeholder="Ex.: Florianópolis"
          value={jobInfo?.location?.city}
          readOnly={true}
        />
      </Input.Wrapper>

      <Input.Wrapper
        id="input-company-state"
        label="Em qual estado está localizada sua empresa?"
        description="sua localização aparecerá no card de vaga"
      >
        <Input
          id="input-company-location"
          placeholder="Ex.: Santa Catarina"
          value={jobInfo?.location?.state}
          readOnly={true}
        />
      </Input.Wrapper>

      <Input.Wrapper
        id="input-company-country"
        label="Em qual país está localizada sua empresa?"
        description="sua localização aparecerá no card de vaga"
      >
        <Input
          id="input-company-location"
          placeholder="Ex.: Brasil"
          value={jobInfo?.location?.country}
          readOnly={true}
        />
      </Input.Wrapper>
    </form>
  )
};
