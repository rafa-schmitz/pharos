import React from "react";
import styles from "./styles.module.css";
import { MdWorkOutline } from "react-icons/md";
import { AppliedJobs } from "./components/AppliedJobs";
import { Configurations } from "./components/Configurations";
import { UserExperiences } from "./components/ProfileEditing/ExperienceEditing";
import { StyledButton } from "./components/StyledButton";
import { useAuth } from '../../context/AuthContext';
import { UserEducations } from "./components/ProfileEditing/EducationsEditing";
import { UserProgrammingLanguages } from "./components/ProfileEditing/ProgrammingLanguages";
import { Avatar } from "@chakra-ui/react";
import { CreatedByJobs } from "./components/CreatedByJobs";
import {IoMdArrowRoundBack} from "react-icons/io";

export const Profile = () => {
  const { user } = useAuth();
  const isRecruiter = user.usertype === 'ROLE_RECRUITER';
  const [showAppliedJobs, setShowAppliedJobs] = React.useState<boolean>(false);
  const [showConfigurations, setShowConfigurations] = React.useState<boolean>(false);
  const handleBackButton = (): void => {
    setShowAppliedJobs(false);
    setShowConfigurations(false);
  }
  const profileType = isRecruiter
    ?
    <>
      <button className={styles['linkToBack']} onClick={handleBackButton}>
        <IoMdArrowRoundBack size={25} color="#fff" />
        <h2>Voltar</h2>
      </button>
      <CreatedByJobs />
    </>
    : <AppliedJobs setShowAppliedJobs={setShowAppliedJobs} setShowConfigurations={setShowConfigurations} />

  const handleAppliedJobsList = (): void => {
    setShowConfigurations(false);
    setShowAppliedJobs((prev) => !prev);
  };

  const handleShowConfigurations = (): void => {
    setShowAppliedJobs(false);
    setShowConfigurations(prev => !prev);
  };

  return (
    <>
      <section className={styles.bg}>
        <div className={styles.mainContainer}>
          {/* left col */}
          <div className={styles.nav}>
            <div className={styles.profilePictureContainer}>
              <Avatar size={"2xl"} width={150} height={150} name={user.username} src={user?.photo?.url || ""} />
            </div>

            <div className={styles.userContent}>
              <h1 className={styles.name}>
                {user?.name} {user?.lastName}
                <span className={styles.username}>{user?.username}</span>
              </h1>

              {
                user?.role &&
                <span className={styles.userPosition}>
                  <MdWorkOutline color="#fff" size={20} />
                  {user?.role}
                </span>
              }

              <StyledButton onClick={handleAppliedJobsList} buttonContent={isRecruiter ? "Ver vagas criadas" : "Ver vagas aplicadas"} isHbo={true} />
              <StyledButton onClick={handleShowConfigurations} buttonContent="Configurações" />
            </div>
          </div>

          {/* right col */}
          <div className={styles.profileContainer}>
            {showAppliedJobs && profileType}
            {showConfigurations && <Configurations setShowAppliedJobs={setShowAppliedJobs} setShowConfigurations={setShowConfigurations} />}
            {
              !showAppliedJobs && !showConfigurations &&
              <>
                <div className={styles.profileHeader}>
                  <div className={styles.experienceHeading}>
                    <span>Experiência</span>
                  </div>

                  <UserExperiences />
                </div>

                <div className={styles.profileHeader}>
                  <div className={styles.experienceHeading}>
                    <span>Formação</span>
                  </div>

                  <UserEducations />
                </div>

                <div className={styles.profileHeader}>
                  <div className={styles.experienceHeading}>
                    <span>Linguagens & Ferramentas</span>
                  </div>

                  <UserProgrammingLanguages />
                </div>
              </>
            }
          </div>
        </div>
      </section>
    </>
  );
};
