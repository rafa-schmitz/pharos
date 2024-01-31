import { Box, Flex, Image, Heading, Grid, GridItem, Text } from '@chakra-ui/react'
import logo from '../../assets/imgs/main-logo.png'
import instagram from '../../assets/imgs/instagram.png'
import facebook from '../../assets/imgs/facebook.png'
import twitter from '../../assets/imgs/twitter.png'
import linkedin from '../../assets/imgs/linkedIn.png'

export const Footer = () => {
    return (
        <Box bg="#0D0221">
            <Flex gap="20px" wrap="wrap" w="100%" padding="100px 20px 30px 20px" alignItems="center" justifyContent="space-between" maxWidth="1220px" margin="0 auto">
                <Box display="flex" flexDirection="column" alignSelf="baseline" gap="40px">
                    <Flex gap="15px" alignItems="center">
                        <Image maxW="80px" src={logo} alt="logo" />
                        <Heading as="h1" fontSize="33px" color="#fff">Pharus</Heading>
                    </Flex>
                    <Text color="#fff" fontSize="16px">
                        Somos apaixonados pelo que fazemos <br />
                        e queremos facilitar sua vida <br />
                        conectando talentos com oportunidades de <br />
                        carreira excepcionais em todo o mundo.
                    </Text>
                    <Flex flexDirection="column" gap="10px">
                        <Text color="#fff" fontSize="16px">
                            Todos os direitos reservados.
                        </Text>
                        <Flex alignItems="center" gap="10px">
                            <Image src={instagram} alt="instagram" />
                            <Image src={linkedin} alt="linkedin" />
                            <Image src={facebook} alt="facebook" />
                            <Image src={twitter} alt="twitter" />
                        </Flex>
                    </Flex>
                </Box>
                <Grid templateColumns={["repeat(2,1fr)", "repeat(3,1fr)"]} gap="90px">
                    <GridItem>
                        <Heading as="h1" fontSize="20px" fontWeight="bold" color="#fff">Fale conosco</Heading>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Carreiras</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Sugestões e reclamações</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Reporte um bug</Text>
                    </GridItem>

                    <GridItem>
                        <Heading as="h1" fontSize="20px" fontWeight="bold" color="#fff">Parceiros</Heading>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Seja um parceiro</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Conheça nossos parceiros</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Serviços</Text>
                    </GridItem>

                    <GridItem>
                        <Heading as="h1" fontSize="20px" fontWeight="bold" color="#fff">Sobre Nós</Heading>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Política de Privacidade</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Sitemap</Text>
                        <Text marginTop="20px" fontSize="17px" color="#fff">Blog</Text>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    )
}