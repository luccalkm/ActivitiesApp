import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Header, Segment, Button } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import LoginForm from '../components/users/LoginForm'
import RegisterForm from '../components/users/RegisterForm'

const Home = () => {
  const { userStore, modalStore } = useStore()

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
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Activities App' />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() =>
                modalStore.openModal(<LoginForm />, 'Login to Activities')
              }
              size='huge'
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() =>
                modalStore.openModal(<RegisterForm />, 'Register to Activities')
              }
              size='huge'
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  )
}

export default observer(Home)
