import WithSubNavigation from '../components/Nav'
import Hero from '../components/Hero'
import Search from '../components/Search'
import { Box, Stack, Container } from '@chakra-ui/react'

const Home: React.FC = () => {

  return (
    <Box>
      <WithSubNavigation/>
      <Box
        bg={'gray.100'}
        css={{
          backgroundAttachment: 'fixed',
        }}>
        <Stack
          as={Container}
          maxW={'7xl'}
          py={{ base: 10, lg: 10 }}
          spacing={{ base: 10, lg: 24 }}
          direction={{ base: 'column', lg: 'row' }}
          alignItems={'start'}
          height="2xl"
        >
          <Stack w="4xl">
            <Hero/>
            <Search/>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Home;