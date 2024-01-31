import React from 'react'
import { Button } from "@chakra-ui/react";

interface IProps {
  buttonContent: string
  onClick?: React.MouseEventHandler
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined
  type?: "button" | "submit" | "reset" | undefined
  isLoading?: boolean
  isHbo?: boolean
}

export const StyledButton = ({ buttonContent, onClick, leftIcon, type, isLoading, isHbo = false }: IProps) => {
  return (
    <>
      {isHbo ?
        <Button
          leftIcon={leftIcon}
          width={["100%", "100%", "100%", "100%", "195px"]}
          color="#fff"
          fontSize={14}
          backgroundPosition="99% 50%"
          backgroundSize="400% 400%"
          transition="all 0.5s"
          padding="20px 50px"
          border="2px solid transparent"
          borderRadius="60px"
          background="linear-gradient( 345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
          _hover={{ backgroundPosition: "1% 50%", borderColor: "#c600ff" }}
          onClick={onClick}
          type={type}
          isLoading={isLoading}
        >
          {buttonContent}
        </Button>
        :
        <Button
          leftIcon={leftIcon}
          borderRadius="24px"
          padding="20px"
          fontWeight="bold"
          fontSize={14}
          color="#fff"
          width={["100%", "100%", "100%", "195px"]}
          height="30px"
          transition="all 0.5s"
          backgroundPosition="0%"
          backgroundSize="500% 500%"
          overflow="hidden"
          border="2px solid #fff"
          background="linear-gradient( 345deg, #fff 0%, #fff 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
          _hover={{ backgroundPosition: "99% 50%", color: "#0D0221" }}
          onClick={onClick}
          type={type}
          isLoading={isLoading}
        >
          {buttonContent}
        </Button>
      }

    </>
  )
}