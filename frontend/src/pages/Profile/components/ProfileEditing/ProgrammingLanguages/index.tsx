import React from "react";
import './styles.css'
import { useAuth } from "../../../../../context/AuthContext";
import { useToast } from '@chakra-ui/react';
import { Box, Group, LoadingOverlay, MultiSelect } from "@mantine/core";
import { StyledButton } from "../../StyledButton";
import { updateUser } from "../../../../../services/userService";
import { User } from "../../../../../types/user";
import { MdKeyboardBackspace, MdBadge, MdAddTask } from "react-icons/md";

const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'go', label: 'Go' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'perl', label: 'Perl' },
  { value: 'r', label: 'R' },
  { value: 'lua', label: 'Lua' },
  { value: 'bash', label: 'Bash' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'objective-c', label: 'Objective-C' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' }
];

const FRAMEWORKS_AND_LIBRARIES = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'django', label: 'Django' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'spring', label: 'Spring' },
  { value: 'express', label: 'Express.js' },
  { value: 'flask', label: 'Flask' },
  { value: 'ruby-on-rails', label: 'Ruby on Rails' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'tensorflow', label: 'TensorFlow' },
  { value: 'pytorch', label: 'PyTorch' },
  { value: 'jquery', label: 'jQuery' },
  { value: 'bootstrap', label: 'Bootstrap' },
  { value: 'materialize', label: 'Materialize' },
  { value: 'bulma', label: 'Bulma' },
  { value: 'redux', label: 'Redux' },
  { value: 'mobx', label: 'MobX' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'gatsby', label: 'Gatsby' }
];

export const UserProgrammingLanguages = () => {
  const userTools: string[] = [];
  const userLanguages: string[] = [];

  const toast = useToast();
  const { user, setUser } = useAuth();

  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [frameworks, setFrameworks] = React.useState<string[]>([]);
  const [isEditingLanguages, setIsEditingLanguages] = React.useState<boolean>(false);
  const [userProgrammingLanguages, setUserProgrammingLanguages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!user?.skills) return

    setFrameworks(user?.skills?.tools);
    setUserProgrammingLanguages(user?.skills?.programmingLanguages);
  }, [user?.skills])

  const handleEducationSubmit = async () => {
    if (!userProgrammingLanguages || !frameworks) return setError(true);

    userProgrammingLanguages?.map((tools: string) => {
      return userLanguages.push(tools);
    })

    frameworks?.map((languages: string) => {
      return userTools.push(languages);
    })

    const newUserObject: User = {
      ...user,
      skills: {
        programmingLanguages: userLanguages,
        tools: userTools
      }
    }

    try {
      setLoading(true);
      const updatedUser = await updateUser(newUserObject);
      setUser(updatedUser);

      setTimeout(() => {
        setIsEditingLanguages(false);
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

        <div className="languages-container">
          <div className="language-col">
            <p className="languages-title">Linguagens que domina</p>
            {!user?.skills?.programmingLanguages.length
              ? "Você ainda não cadastrou nenhuma informação sobre as linguagens que domina"

              : user?.skills?.programmingLanguages?.map((languages: string, index) => {
                return (
                  <ul key={index}>
                    <li className="languages-header">
                      <p>{languages}</p>
                    </li>
                  </ul>
                )
              })
            }
          </div>

          <div className="framework-col">
            <p className="languages-title">Bibliotecas e Frameworks</p>
            {user?.skills?.tools?.map((frameworks: string, index) => {
              return (
                <ul key={index}>
                  <li className="languages-header">
                    <p>{frameworks}</p>
                  </li>
                </ul>
              )
            })
            }
          </div>
        </div>

        {isEditingLanguages &&
          <>
            <MultiSelect
              label="Escolha as linguagens que você domina"
              description="Escolha quantas linguagens quiser"
              placeholder="Escolher"
              clearable
              data={PROGRAMMING_LANGUAGES}
              value={userProgrammingLanguages}
              onChange={(value) => {
                setUserProgrammingLanguages(value);
                setError(false);
              }}
              pt="lg"
              error={error}
            />

            <MultiSelect
              label="Escolha os frameworks e bibliotecas que você usa/usou"
              placeholder="Escolher"
              clearable
              data={FRAMEWORKS_AND_LIBRARIES}
              value={frameworks}
              onChange={(value) => {
                setFrameworks(value);
                setError(false);
              }}
              pt="lg"
              error={error}
            />

            <Group pt="lg" position="center" w="100%">
              <StyledButton leftIcon={<MdAddTask />} isHbo={true} buttonContent="Salvar informações" onClick={handleEducationSubmit} />
            </Group>
          </>
        }

        <Group position="center" w="100%" pt="lg">
          <StyledButton leftIcon={isEditingLanguages ? <MdKeyboardBackspace /> : <MdBadge />} isHbo={true} buttonContent={isEditingLanguages ? "Voltar" : "Editar informações"} onClick={() => setIsEditingLanguages((prev) => !prev)} />
        </Group>
      </Box>
    </>
  );
};