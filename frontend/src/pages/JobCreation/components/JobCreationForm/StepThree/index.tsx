import { Input, NumberInput, Group, Text, FileInput } from '@mantine/core';
import './styles.css'
import React, {useState} from 'react';
import { useJobInfo } from '../../../../../context/JobContext'
import {Button} from "@chakra-ui/react";
import {FiUpload} from 'react-icons/fi'
import {createJob, uploadFileJob} from "../../../../../services/jobService";
import { useToast } from '@chakra-ui/react'
import {Job} from "../../../../../types/jobContext";

interface IJobCreationStepThree {
  initialStep(): void
}
export const JobCreationStepThree = ({ initialStep }:IJobCreationStepThree) => {
  const { jobInfo, setJobInfo ,setFile, file } = useJobInfo();
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const handleOnChangeFile = (file:File | null) => {
    if(!file) return
    setFile(file)
  }
  const handleCreateJob = async () => {
    try {
      setLoading(true)
      const {id} = await createJob(jobInfo)
      if (id && file) await uploadFileJob(id, file)
      toast({
        title: 'Vaga criada com sucesso!',
        status: 'success',
        duration: 1000,
        position: "top-right"
      })
      setTimeout(() => {
        setLoading(false)
        setJobInfo({} as Job)
        initialStep();
      },1000)
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
        toast({
          title: 'Erro ao criar a vaga!',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  }

  return (
    <form className="formContainer" >
      <Input.Wrapper
        id="input-company-position"
        label="Título da vaga"
        description="Título do card da sua vaga"
      >
        <Input
          id="input-company-position"
          placeholder="Insira um título"
          value={jobInfo?.position}
          onChange={(event) => setJobInfo({...jobInfo, position: event.target.value})} />
      </Input.Wrapper>

      <NumberInput
        label="Proposta de salário inicial"
        description="é negociável? :)"
        placeholder={'$ 1,500'}
        parser={(value) => value.replace(/\$\s\r?|(,*)/g, '')}
        value={jobInfo?.salaryCap}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value))
            ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            : ''
        }
        hideControls
        onChange={(event) => {
          if (event) {
            setJobInfo({...jobInfo, salaryCap: event})       
          }
        }}
      />

      <div className='file-upload'>
        <Text size="sm" fw='580' align="start" mt="sm" pb='10px'>
          Insira o logo da sua empresa
        </Text>

        <Group position="left">
          <FileInput
            value={file}
            onChange={handleOnChangeFile}
            style={{ width:"100%" }}
            icon={<FiUpload color="#fff" size={15} />}
            placeholder="Insira um arquivo"
          />
        </Group>
      </div>

      <Button
        style={{ gridColumnStart: 2, gridRowStart:5 }}
        width={["100%", "300px"]}
        color="#fff"
        backgroundPosition="99% 50%"
        backgroundSize="400% 400%"
        transition="all 0.5s"
        padding="20px 50px"
        border="2px solid transparent"
        borderRadius="60px"
        background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
        _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
        isLoading={loading}
        onClick={() => handleCreateJob()}
      >
        Criar vaga
      </Button>
    </form>
  )
};
