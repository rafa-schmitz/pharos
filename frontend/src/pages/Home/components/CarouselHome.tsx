import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import javaIcon from '../../../assets/imgs/programmingLanguages/java-plain.png'
import jsIcon from '../../../assets/imgs/programmingLanguages/javascript-original.png'
import nodeIcon from '../../../assets/imgs/programmingLanguages/nodejs-plain.png'
import pythonIcon from '../../../assets/imgs/programmingLanguages/python-original.png'
import reactIcon from '../../../assets/imgs/programmingLanguages/react.png'
import vueIcon from '../../../assets/imgs/programmingLanguages/vue.png'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CarouselHome = () => {
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <Box maxWidth="1220px" padding="0 20px" margin="0 auto" marginTop="100px">
      <Text fontSize="22px" fontWeight="bold" zIndex={10} position="relative" mb="25px">Filtre sua busca pela vaga perfeita!</Text>
      <Carousel
        style={{ zIndex: "2" }}
        withIndicators
        height={200}
        slideSize="25%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={4}
        plugins={[autoplay.current]}
        nextControlIcon={<ArrowForwardIcon boxSize={30} color="#fff" />}
        previousControlIcon={<ArrowBackIcon boxSize={30} color="#fff" />}
        styles={{
          control: {
            backgroundColor: "transparent",
            border: "none",
          }
        }}
      >
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={reactIcon} cursor="pointer" /></Carousel.Slide>
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={javaIcon} cursor="pointer" /></Carousel.Slide>
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={jsIcon} cursor="pointer" /></Carousel.Slide>
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={vueIcon} cursor="pointer" /></Carousel.Slide>
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={nodeIcon} cursor="pointer" /></Carousel.Slide>
        <Carousel.Slide onClick={() => navigate('/jobs')}><Image margin="0 auto" src={pythonIcon} cursor="pointer" /></Carousel.Slide>

      </Carousel>
    </Box>
  )
}