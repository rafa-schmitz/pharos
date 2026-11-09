import { useState } from 'react'
import {
  Card,
  CardHeader,
  Flex,
  Box,
  Image,
  Button,
  Text,
  Heading,
} from '@chakra-ui/react'
import { MdPlace, MdWork, MdDeleteSweep, MdKeyboardBackspace } from 'react-icons/md'
import { TbClock } from 'react-icons/tb'
import { BsBriefcase, BsTrash3Fill } from 'react-icons/bs'
import { FaClipboardList } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { List, Modal, Group, Text as MantineText, LoadingOverlay } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Content as Job } from '../../types/jobs'
import { useJobApplication } from '../../hooks/useJobApplication'
import { useAppToast } from '../../hooks/useAppToast'
import { useAuth } from '../../context/AuthContext'
import { deletejob } from '../../services/jobService'
import { formattedGetDate } from '../../utils/formattedGetDate'
import { formattedSalary } from '../../utils/fomattedSalary'
import { tokens } from '../../utils/chakraTheme'

import styles from './styles.module.css'

// ============================================================================
// Types
// ============================================================================

type JobCardVariant = 'listing' | 'detail' | 'managed'

interface JobCardProps {
  job: Job
  variant?: JobCardVariant
  onDelete?: (id: number) => void
}

// ============================================================================
// Sub-components
// ============================================================================

interface JobLogoProps {
  logo?: Job['logo']
}

const JobLogo = ({ logo }: JobLogoProps) => (
  <Box minWidth={90}>
    {logo ? (
      <Image maxWidth={90} width="100%" src={logo.url} alt="Company logo" />
    ) : (
      <BsBriefcase size={70} color="#fff" />
    )}
  </Box>
)

interface JobMetaItemProps {
  icon: React.ReactNode
  children: React.ReactNode
}

const JobMetaItem = ({ icon, children }: JobMetaItemProps) => (
  <Flex align="center" gap="10px">
    {icon}
    <Text className={styles.textInfoJobs}>{children}</Text>
  </Flex>
)

interface JobActionsProps {
  jobId: number
  variant: JobCardVariant
}

const JobActions = ({ jobId, variant }: JobActionsProps) => {
  const navigate = useNavigate()
  const { isApplied, isLoading, canApply, applyToJob } = useJobApplication({
    jobId,
  })

  const showDetailsButton = variant === 'listing' || variant === 'managed'

  return (
    <Flex
      gap="20px"
      justifyContent="space-between"
      direction={['column', 'column', 'column', 'column', 'row']}
      mt={4}
    >
      <Button
        variant="primary"
        width={['100%', '100%', '100%', '100%', '195px']}
        onClick={applyToJob}
        isDisabled={!canApply || isApplied}
        isLoading={isLoading}
      >
        {isApplied ? 'Vaga aplicada' : 'Quero me candidatar'}
      </Button>

      {showDetailsButton && (
        <Button
          variant="outline"
          width={['100%', '100%', '100%', '100%', '195px']}
          onClick={() => navigate(`/job/${jobId}`)}
        >
          Detalhes da vaga
        </Button>
      )}
    </Flex>
  )
}

// ============================================================================
// Helper functions
// ============================================================================

const getRelativeDate = (createdAt: string): string => {
  const today = new Date()
  const createdDate = new Date(createdAt)
  const diffDays = today.getDate() - createdDate.getDate()

  if (diffDays <= 0) return 'Hoje'
  return `${formattedGetDate(String(-diffDays))} dias atrás`
}

// ============================================================================
// Main Component
// ============================================================================

export const JobCard = ({
  job,
  variant = 'listing',
  onDelete,
}: JobCardProps) => {
  const {
    id,
    company,
    description,
    logo,
    location,
    position,
    contractType,
    salaryCap,
    createdAt,
    seniority,
    requirements,
    createdBy,
  } = job

  const { user } = useAuth()
  const toast = useAppToast()
  const [opened, { open, close, toggle }] = useDisclosure(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const relativeDate = getRelativeDate(createdAt)
  const isDetailView = variant === 'detail'
  const isManaged = variant === 'managed'
  const canDelete = isManaged && user?.id === createdBy?.id

  const handleDeleteJob = async () => {
    try {
      setIsDeleting(true)
      await deletejob(id)
      toast.success('Vaga excluída com sucesso!')
      onDelete?.(id)
    } catch (error) {
      toast.error('Erro ao excluir a vaga')
    } finally {
      setIsDeleting(false)
      toggle()
    }
  }

  return (
    <>
      <Card
        bg={tokens.colors.background.card}
        width="100%"
        margin="0"
        zIndex={2}
        padding="30px"
        borderRadius={tokens.radii.card}
        boxShadow={isDetailView ? tokens.shadows.cardIntense : tokens.shadows.card}
        position="relative"
      >
        <LoadingOverlay visible={isDeleting} overlayBlur={3} overlayColor="#0D022105" overlayOpacity={0.01} />
        <CardHeader padding={0}>
          <Flex gap="20px" direction={['column', 'column', 'row']}>
            <JobLogo logo={logo} />

            <Flex direction="column" width="100%">
              {/* Header with title and optional delete button */}
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Heading as="h2" className={styles.titlePosition}>
                  {position}
                </Heading>
                {canDelete && (
                  <button
                    onClick={open}
                    style={{ width: 'fit-content' }}
                    aria-label="Excluir vaga"
                  >
                    <BsTrash3Fill color="#fff" size={20} />
                  </button>
                )}
              </Flex>

              <Text className={styles.titleCompany}>{company}</Text>

              {/* Job metadata */}
              <Flex
                direction={isDetailView ? 'column' : 'row'}
                align={isDetailView ? 'flex-start' : 'center'}
                justifyContent="space-between"
                gap={isDetailView ? '15px' : '5px'}
                flexWrap="wrap"
              >
                <JobMetaItem icon={<MdPlace color="#fff" size={20} />}>
                  {isDetailView
                    ? `${location.country}, ${location.state}, ${location.city}`
                    : location.state}
                </JobMetaItem>

                <JobMetaItem icon={<MdWork color="#fff" size={20} />}>
                  {isDetailView ? `${seniority} - ${contractType}` : contractType}
                </JobMetaItem>

                <JobMetaItem icon={<TbClock color="#fff" size={20} />}>
                  {relativeDate}
                </JobMetaItem>

                {/* Requirements - only in detail view */}
                {isDetailView && requirements && requirements.length > 0 && (
                  <Flex direction="column" gap="10px">
                    <JobMetaItem icon={<FaClipboardList size={20} color="#fff" />}>
                      Requisitos
                    </JobMetaItem>
                    <List size="md">
                      {requirements.map((requirement, index) => (
                        <List.Item key={index}>{requirement}</List.Item>
                      ))}
                    </List>
                  </Flex>
                )}

                <JobMetaItem icon={<GiReceiveMoney size={20} color="#fff" />}>
                  {formattedSalary(salaryCap)}
                </JobMetaItem>
              </Flex>

              {/* About the job - only in detail view */}
              {isDetailView && (
                <Heading as="h3" className={styles.titlePositionAboutJob}>
                  Sobre a vaga
                </Heading>
              )}

              <Text className={styles.textDescription}>{description}</Text>

              {/* Action buttons */}
              <JobActions jobId={id} variant={variant} />
            </Flex>
          </Flex>
        </CardHeader>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal opened={opened} onClose={close} centered>
        <MantineText pb="30px" align="center" color="white">
          Deseja realmente excluir essa vaga?
        </MantineText>
        <Group position="center">
          <Button
            variant="outline"
            leftIcon={<MdKeyboardBackspace />}
            onClick={close}
          >
            Voltar
          </Button>
          <Button
            variant="primary"
            leftIcon={<MdDeleteSweep />}
            onClick={handleDeleteJob}
            isLoading={isDeleting}
          >
            Excluir
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default JobCard
