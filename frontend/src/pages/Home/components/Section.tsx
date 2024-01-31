import { Image, Flex, Text, Heading } from '@chakra-ui/react';
import eclipse from '../../../assets/imgs/home/eclipse-home.png';
import './index.css';
import React from 'react';
import { StatsCounter } from './StatsCounter';

export const Section = () => {
  React.useLayoutEffect(() => {
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      })
    });

    if (hiddenElements) {
      hiddenElements.forEach((element: Element) => observer.observe(element))
    }
  }, [])

  return (
    <Flex flexDirection="column" alignItems="center" marginTop={["85px", "200px"]} zIndex="2" padding="0 20px">
      <Flex overflow="hidden" flexDirection="column" alignItems="center" zIndex="2" maxWidth="1220px">
        <Heading textAlign="center" color="#fff" fontSize={["28px", "48px"]} fontWeight="bold">Conecte-se com empresas que valorizam seu talento</Heading>
        <Flex className="stats" gap="70px" wrap="wrap" margin={["85px 0", "85px 0 200px 0"]} justifyContent="center">
          <Flex id='left' className="hidden" flexDirection="column" alignItems="center">
            <Heading color="#fff" fontSize="96px">30+</Heading>
            <Text color="#fff" fontSize="26px">Empresas parceiras</Text>
          </Flex>
          <Flex id='left' className="hidden" flexDirection="column" alignItems="center">
            <Heading color="#fff" fontSize="96px">500+</Heading>
            <Text color="#fff" fontSize="26px">Profissionais cadastrados</Text>
          </Flex>
          <Flex id='left' className="hidden" flexDirection="column" alignItems="center">
            <StatsCounter initialSpeed={35} />
            <Text color="#fff" fontSize="26px">Vagas de emprego</Text>
          </Flex>
        </Flex>
        <Heading id='right' className="hidden" color="#fff" textAlign={["center", "left"]} fontSize={["28px", "48px"]} borderBottom="1px solid #fff">
          Infinitas possibilidades em diferentes áreas
        </Heading>
        <Text id='right' className="hidden" color="#fff" textAlign={["center", "left"]} fontSize={["28px", "48px"]} margin="60px 0">
          Vagas atualizadas em tempo real, sem perder tempo.
        </Text>
        <Text id='right' className="hidden" textAlign={["center", "left"]} color="#fff" fontSize="20px" maxW="900px">
          Não perca mais tempo navegando por sites de emprego confusos e desorganizados. Use o nosso sistema de listagem de vagas para encontrar a oportunidade de emprego dos seus sonhos hoje mesmo! Com uma grande variedade de vagas de emprego de alta qualidade em diversas áreas, nosso sistema de listagem de vagas é o seu ponto de partida para uma carreira de sucesso. Comece sua busca agora!
        </Text>
      </Flex>
      <Image
        width="700px"
        src={eclipse}
        position="absolute"
        left="0"
        zIndex="1"
        top="50%"
        transform="translateY(-50%)"
      />
    </Flex>
  )
}