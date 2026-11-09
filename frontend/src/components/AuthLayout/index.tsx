import React from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import logo from '../../assets/imgs/main-logo.png'
import { tokens } from '../../utils/chakraTheme'

import styles from './styles.module.css'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
}

/**
 * Shared layout component for authentication pages (Login, Signup).
 * Provides consistent branding, background, and form container styling.
 */
export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <Flex
      direction="column"
      width="100%"
      minHeight="100vh"
      backgroundColor={tokens.colors.background.dark}
      alignItems="center"
      gap="3vh"
    >
      {/* Logo Header */}
      <Flex
        width="100%"
        gap="10px"
        maxW="1272px"
        padding="22px 22px 0 22px"
      >
        <Link to="/" className={styles.logoLink}>
          <Image maxW="90px" maxH="90px" src={logo} alt="Pharos logo" />
          <Heading as="h1" fontSize="33px" color="#fff">
            Pharus
          </Heading>
        </Link>
      </Flex>

      {/* Main Content */}
      <Flex
        direction="column"
        gap="25px"
        justifyContent="center"
        alignItems="center"
      >
        {title && (
          <Heading
            as="h1"
            fontSize="30px"
            color="#fff"
            fontWeight="medium"
            margin="0"
            textAlign="center"
          >
            {title}
          </Heading>
        )}

        {/* Form Container */}
        <div className={styles.formContainer}>
          {children}
        </div>
      </Flex>
    </Flex>
  )
}

export default AuthLayout
