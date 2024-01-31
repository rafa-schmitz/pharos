import React from 'react';

import '../ProfileEditing/ExperienceEditing/components/ExperienceItemList/styles.css'
import styles from '../../styles.module.css';
import { Experience, User } from '../../../../types/user';
import { getUser } from '../../../../services/userService';
import { useParams } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { MdForwardToInbox, MdWorkOutline } from 'react-icons/md';
import { StyledButton } from '../StyledButton';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CreatedByJobs } from '../CreatedByJobs';
import { IoMdArrowRoundBack } from 'react-icons/io';

dayjs.extend(utc);
dayjs.locale('pt-br');

export const ProfileByUserId = () => {
  const { id } = useParams();

  const [userFromParam, setUserFromParam] = React.useState<User>();
  const [showCreatedJobs, setShowCreatedJobs] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    getUser(Number(id))
      .then(res => setUserFromParam(res));
  }, []);

  return (
    <>
      <section className={styles.bg}>
        <div className={styles.mainContainer}>
          {/* left col */}
          <div className={styles.nav}>
            <div className={styles.profilePictureContainer}>
              <Avatar size={"2xl"} width={150} height={150} name={userFromParam?.username} src={userFromParam?.photo?.url || ""} />
            </div>

            <div className={styles.userContent}>
              <h1 className={styles.name}>
                {userFromParam?.name} {userFromParam?.lastName}
                <span className={styles.username}>{userFromParam?.username}</span>
              </h1>

              {
                userFromParam?.role &&
                <span className={styles.userPosition}>
                  <MdWorkOutline color="#fff" size={20} />
                  {userFromParam?.role}
                </span>
              }

              {
                userFromParam?.usertype === "ROLE_RECRUITER" &&
                <div className={styles.recruiter}>
                  <span>
                    <MdWorkOutline color="#fff" size={20} />
                    {userFromParam?.name} é um(a) <b>recrutador(a)!</b> <br />
                  </span>

                  <span>
                    <MdForwardToInbox color="#fff" size={20} />
                    Contato: {userFromParam?.email}
                  </span>
                </div>
              }

              <StyledButton buttonContent={`Vagas criadas`} isHbo={true} onClick={() => setShowCreatedJobs((prev) => !prev)} />
            </div>
          </div>

          {/* right col */}
          <div className={styles.profileContainer}>
            {
              !showCreatedJobs
                ?
                <>
                  <div className={styles.profileHeader}>
                    <div className={styles.experienceHeading}>
                      <span>Experiência</span>
                    </div>

                    {
                      !!userFromParam?.experience?.length
                        ? userFromParam?.experience?.map((experience: Experience, index: number) => {
                          return (
                            <React.Fragment key={index}>
                              <li
                                key={index}
                                className="profileHeader"
                              >
                                <p className="jobRole">Cargo: <span>{experience?.position}</span></p>
                                <p className="company">Empresa: <span>{experience?.companyName}</span></p>
                                <p>Período: <span>{dayjs(experience?.startDate).format('LL')} até {dayjs(experience?.endDate).isToday() ? "o presente momento" : dayjs(experience?.endDate).format('LL')}</span></p>
                              </li>
                            </React.Fragment>
                          )
                        })
                        : `${userFromParam?.name} ainda não cadastrou experiências profissionais`
                    }
                  </div>

                  <div className={styles.profileHeader}>
                    <div className={styles.experienceHeading}>
                      <span>Formação</span>
                    </div>

                    {!userFromParam?.educations?.length ? `${userFromParam?.name} ainda não cadastrou formações acadêmicas` : userFromParam?.educations}
                  </div>

                  <div className={styles.profileHeader}>
                    <div className={styles.experienceHeading}>
                      <span>Linguagens & Ferramentas</span>
                    </div>

                    <div className="languages-container">
                      <div className="language-col">
                        <p className="languages-title">Linguagens que domina</p>
                        {!userFromParam?.skills?.programmingLanguages.length
                          ? `${userFromParam?.name} ainda não cadastrou nenhuma informação sobre as linguagens que domina`

                          : userFromParam?.skills?.programmingLanguages?.map((languages: string, index: number) => {
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
                        {userFromParam?.skills?.tools?.map((frameworks: string, index: number) => {
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
                  </div>
                </>

                :
                <>
                  <button className={styles['linkToBack']} onClick={() => setShowCreatedJobs(false)}>
                    <IoMdArrowRoundBack size={25} color="#fff" />
                    <h2 style={{textDecoration: "underline"}}>Voltar</h2>
                  </button>

                  <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Vaga(s) criada(s) por {userFromParam?.name} {userFromParam?.lastName}:</h1>
                  <CreatedByJobs id={Number(id)} />
                </>
            }
          </div>
        </div>
      </section>
    </>
  );
};