import React from 'react'
import { JobProvider } from '../../context/JobContext';
import { MultiStepper } from './components/Stepper';
import styles from "./styles.module.css";

export const JobCreation = () => {
  return (
    <section className={styles.mainContainer}>
      <JobProvider>
        <MultiStepper />
      </JobProvider>
    </section>
  )
} 