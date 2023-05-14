import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Header, Segment, Button } from 'semantic-ui-react'

const Home = () => {
  return (
    <Segment className='masthead' textAlign='center' inverted vertical>
      <Container text>
        <Header as='h1'>
          <Image
            size='massive'
            src='../../assets/logo.png'
            style={{ marginBottom: 12 }}
          />
          Activities
        </Header>
        <Header as='h2' inverted content='Welcome to Activities App' />
        <Button as={Link} to='/login' size='huge' inverted>
          Login
        </Button>
      </Container>
    </Segment>
  )
}

export default Home
