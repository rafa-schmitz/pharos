import { Box } from '@chakra-ui/react';
import { CarouselHome } from './components/CarouselHome'
import { CardHome } from './components/CardHome'
import { Section } from './components/Section'


export const Home = () => {
  return (
    <>
      <Box minH="100vh" bg="#0D0221">
        <CardHome />
        <CarouselHome />
        <Section />
      </Box>
    </>
  )
}