import React from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { useToast } from '@chakra-ui/react';
import { Box, Group, LoadingOverlay, Select } from "@mantine/core";
import { StyledButton } from "../../StyledButton";
import { updateUser } from "../../../../../services/userService";
import { MdKeyboardBackspace, MdBadge, MdAddTask } from "react-icons/md";

const BACHELORS_DEGREE_COURSES_DATA = ["Administração", "Administração Pública", "Agroecologia", "Agronegócio", "Agronomia", "Análise e Desenvolvimento de Sistemas", "Antropologia", "Arquitetura e Urbanismo", "Arquivologia", "Artes", "Artes Cênicas", "Astronomia", "Biblioteconomia", "Biologia", "Biomedicina", "Biotecnologia", "Bioquímica", "Canto", "Cenografia", "Ciência da Computação", "Ciências Biológicas", "Ciências Contábeis", "Ciências Econômicas", "Ciências Sociais", "Cinema e Audiovisual", "Ciências Atuariais", "Composição e Regência", "Computação", "Computação e Robótica Educativa", "Comunicação e Marketing", "Comunicação Social", "Desenho Industrial", "Design", "Design de Ambientes", "Design de Games", "Design de Interiores", "Design de Moda", "Design de Produto", "Design Digital", "Design Gráfico", "Direção", "Direito", "Dança", "Desenvolvimento Rural", "Desenvolvimento Regional", "Educação Física", "Educação do Campo", "Enfermagem", "Engenharia Acústica", "Engenharia Aeroespacial", "Engenharia Aeronáutica", "Engenharia Agrícola", "Engenharia Agroindustrial", "Engenharia Agronômica", "Engenharia Ambiental", "Engenharia Automotiva", "Engenharia Bioenergética", "Engenharia Biomédica", "Engenharia Bioquímica", "Engenharia Biotecnológica", "Engenharia Cartográfica", "Engenharia Civil", "Engenharia da Computação", "Engenharia da Mobilidade", "Engenharia de Agrimensura", "Engenharia de Agronegócios", "Engenharia de Alimentos", "Engenharia de Aquicultura", "Engenharia de Automação", "Engenharia de Bioprocessos", "Engenharia de Biossistemas", "Engenharia de Biotecnologia", "Engenharia de Energia", "Engenharia de Gestão", "Engenharia de Informação", "Engenharia de Instrumentação, Automação e Robótica", "Engenharia de Manufatura", "Engenharia de Materiais", "Engenharia de Minas", "Engenharia de Pesca", "Engenharia de Petróleo", "Engenharia de Produção", "Engenharia de Recursos Hídricos", "Engenharia de Saúde e Segurança", "Engenharia de Sistemas", "Engenharia de Serviços", "Engenharia de Software", "Engenharia de Telecomunicações", "Engenharia de Transporte e Logística", "Engenharia Elétrica", "Engenharia Eletrônica", "Engenharia em Sistemas Digitais", "Engenharia Ferroviária e Metroviária", "Engenharia Física", "Engenharia Florestal", "Engenharia Geológica", "Engenharia Hídrica", "Engenharia Industrial", "Engenharia Mecânica", "Engenharia Mecatrônica", "Engenharia Metalúrgica", "Engenharia Naval", "Engenharia Química", "Engenharia Têxtil", "Estatística", "Farmácia", "Filosofia", "Física", "Fisioterapia", "Fonoaudiologia", "Geografia", "Geologia", "História", "História da Arte", "Hotelaria", "Jornalismo", "Letras", "Marketing", "Matemática", "Mecânica Industrial", "Medicina", "Medicina Veterinária", "Moda", "Música", "Museologia", "Nutrição", "Odontologia", "Pedagogia", "Políticas Públicas", "Propaganda e Marketing", "Psicologia", "Publicidade e Propaganda", "Química", "Rádio, TV e Internet", "Relações Internacionais", "Relações Públicas", "Secretariado Executivo", "Saúde Coletiva", "Serviço Social", "Teatro", "Teologia", "Terapia Ocupacional", "Tradutor e Intérprete", "Turismo", "Zootecnia"]

const TECHNICIAN_DEGREE_COURSES_DATA = ["Informática", "Informática para Internet", "Manutenção e Suporte em Informática", "Programação de Jogos Digitais", "Redes de Computadores", "Sistemas de Comutação", "Sistemas de Transmissão", "TelecomunicaçõesAnálises Químicas", "Automação Industrial", "Eletroeletrônica", "Eletromecânica", "Eletrônica", "Eletrotécnica", "Manutenção Automotiva", "Máquinas Navais", "Mecânica", "Mecatrônica", "Desenvolvimento de Sistemas", "Metalurgia", "Petroquímica", "Química", "Refrigeração e Climatização", "Sistemas a Gás"];

export const UserEducations = () => {
  const userEducation: string[] = [];
  const toast = useToast();
  const { user, setUser } = useAuth();
  const [isEditingEducation, setIsEditingEducations] = React.useState<boolean>(false);
  const [education, setEducation] = React.useState<string | null>("");
  const [educationType, setEducationType] = React.useState<string | null>("");
  const [educationStatus, setEducationStatus] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const shouldShowBachelorsDegreeCourses = education === "Ensino Superior";
  const shouldShowTechnicianDegreeCourses = education === "Ensino Técnico";

  const handleEducationSubmit = async () => {
    if (!education) return setError(true);

    if (education === "Ensino Médio") {
      if (!educationStatus) return setError(true);
      userEducation.push(`${education} ${educationStatus}`);
    } else {
      if (!educationType || !educationStatus) return setError(true);
      userEducation.push(`${education} em ${educationType} ${educationStatus}`);
    }

    const newUserObject = {
      ...user,
      educations: userEducation
    }

    try {
      setLoading(true);
      const updatedUser = await updateUser(newUserObject);
      setUser(updatedUser);

      setTimeout(() => {
        setIsEditingEducations(false);
        setLoading(false);
        toast({
          title: 'Informações atualizadas com sucesso!',
          status: 'success',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: 'Erro ao salvar informações!',
          status: 'error',
          duration: 2000,
          position: "top-right"
        })
      }, 1000)
    }
  }

  return (
    <>
      <Box w="100%" pos="relative" pb="lg">
        <LoadingOverlay visible={loading} overlayBlur={3} overlayColor="#0D022105" overlayOpacity={0.01} />

        {!user?.educations?.length ? "Nenhuma formação cadastrada" : user?.educations}

        {isEditingEducation &&
          <>
            <Select
              label="Escolha a formação"
              placeholder="Escolher"
              clearable
              data={['Ensino Médio', 'Ensino Técnico', 'Ensino Superior']}
              value={education}
              onChange={(value) => {
                setEducation(value);
                setError(false);
              }}
              pt="lg"
              error={error}
            />

            {shouldShowBachelorsDegreeCourses &&
              <Select
                label="Escolha a formação"
                placeholder="Escolher"
                clearable
                searchable
                nothingFound="Curso não encontrado"
                data={BACHELORS_DEGREE_COURSES_DATA}
                value={educationType}
                onChange={(value) => {
                  setEducationType(value);
                  setError(false);
                }}
                pt="lg"
                error={error}
              />
            }

            {shouldShowTechnicianDegreeCourses &&
              <Select
                label="Escolha a formação"
                placeholder="Escolher"
                clearable
                data={TECHNICIAN_DEGREE_COURSES_DATA}
                value={educationType}
                onChange={(value) => {
                  setEducationType(value);
                  setError(false);
                }}
                searchable
                nothingFound="Curso não encontrado"
                pt="lg"
                error={error}
              />
            }

            <Select
              label="Escolha o status da formação"
              placeholder="Escolher"
              clearable
              data={['Completo', 'Em andamento', 'Incompleto',]}
              value={educationStatus}
              onChange={(value) => {
                setEducationStatus(value);
                setError(false);
              }}
              pt="lg"
              error={error}
            />

            <Group pt="lg" position="center" w="100%">
              <StyledButton leftIcon={<MdAddTask />} buttonContent="Salvar informações" onClick={handleEducationSubmit} isHbo={true} />
            </Group>
          </>
        }

        <Group position="center" w="100%" pt="lg">
          <StyledButton leftIcon={isEditingEducation ? <MdKeyboardBackspace /> : <MdBadge />} isHbo={true} buttonContent={isEditingEducation ? "Voltar" : "Editar informações"} onClick={() => setIsEditingEducations((prev) => !prev)} />
        </Group>
      </Box>
    </>
  );
};