import { defineStyle, defineStyleConfig } from '@chakra-ui/react'


export const buttonTheme = defineStyleConfig({
    defaultProps: {
        size: 'md',
        variant: 'ghost',
        colorScheme: 'brand',
      },
})