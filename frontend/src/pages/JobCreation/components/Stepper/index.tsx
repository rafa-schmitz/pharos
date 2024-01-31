import React from 'react';
import "./styles.css";
import {Stepper} from '@mantine/core';
import {JobCreationStepOne} from '../JobCreationForm/StepOne';
import {JobCreationStepTwo} from '../JobCreationForm/StepTwo';
import {JobCreationStepThree} from '../JobCreationForm/StepThree';
import {StyledButton} from "../../../Profile/components/StyledButton";

export const MultiStepper = () => {
  const [active, setActive] = React.useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const initialStep = () => setActive(0);
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" orientation="vertical">
        <Stepper.Step label="Primeiro passo" description="Preencha com os dados da sua empresa">
          <JobCreationStepOne/>
        </Stepper.Step>


        <Stepper.Step label="Segundo passo" description="Preencha com as skills que você procura">
          <JobCreationStepTwo/>
        </Stepper.Step>

        <Stepper.Step label="Terceiro passo" description="Complemente com informações importantes">
          <JobCreationStepThree initialStep={initialStep}/>
        </Stepper.Step>
      </Stepper>

      <div className="steps-button-row">
        <StyledButton buttonContent='Voltar' onClick={prevStep}/>
        {active < 2 && <StyledButton buttonContent='Próximo passo' onClick={nextStep}/>}
      </div>
    </>
  );
}