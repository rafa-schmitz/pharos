import React from 'react'
import { Select, TextInput } from '@mantine/core';
import { Flex } from '@chakra-ui/react';
import './SearchBar.css'
import {QueryParamsJobs} from "../../../../types/jobs";

interface ISearchBar {
  setAction: React.Dispatch<React.SetStateAction<string>>
  setInput: React.Dispatch<React.SetStateAction<string>>
  setOrderBy: React.Dispatch<React.SetStateAction<QueryParamsJobs | undefined>>
}

export const SearchBar = ({ setAction, setInput, setOrderBy }:ISearchBar) => {

  const dataFilter = [
    { value: 'seniority', label: 'Senioridade' },
    { value: 'position', label: 'Posição' },
    { value: 'company', label: 'Empresa' },
    { value: 'contractType', label: 'Contrato' }

  ];
  const dataOrderBy= [
    { value: 'sortByCreatedAtAsc', label: 'Menos recentes' },
    { value: 'sortByCreatedAtDesc', label: 'Mais recentes' }
  ];


  return (
    <Flex width={"100%"} gap="20px" direction={["column", "column", "column","row"]}>
      <TextInput 
        placeholder='Busque sua vaga'
        classNames={{
          root:"inputContainer",
          input:"inputTextInput"
        }}
        onChange={(event) => setInput(event.target.value)}
       />
      <Select
        style={{width:"100%", zIndex:10}}
        clearable
        data={dataFilter}
        placeholder="Busque por"
        height={100}
        classNames={{
          input:"searchInput",
          dropdown:"searchDropdown",
          item:"searchDropdownItem",
          root:"searchWrapper"
        }}
        onChange={event => {
          if(!event){
            setAction('')
            return
          }
          setAction(event)
        }}
      />   <Select
            style={{width:"100%", zIndex:10}}
            clearable
            data={dataOrderBy}
            placeholder="Ordenar por"
            height={100}
            classNames={{
              input:"searchInput",
              dropdown:"searchDropdown",
              item:"searchDropdownItem",
              root:"searchWrapper"
            }}
            onChange={(event:QueryParamsJobs | null) => {
              if(!event){
                setOrderBy(undefined)
                return
              }
              setOrderBy(event)
            }}
      />
    </Flex>
  )
}