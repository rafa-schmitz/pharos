import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface StyledButtonProps extends Omit<ButtonProps, 'variant'> {
  buttonContent: string
  leftIcon?: ReactElement
  isHbo?: boolean
}

/**
 * Styled button component that uses the theme variants.
 * @param isHbo - If true, uses the primary (gradient) variant. Otherwise uses secondary (outline).
 */
export const StyledButton = ({
  buttonContent,
  leftIcon,
  isHbo = false,
  ...rest
}: StyledButtonProps) => {
  return (
    <Button
      variant={isHbo ? 'primary' : 'secondary'}
      leftIcon={leftIcon}
      width={['100%', '100%', '100%', '195px']}
      {...rest}
    >
      {buttonContent}
    </Button>
  )
}