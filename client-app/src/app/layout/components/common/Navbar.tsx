import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../../../stores/store'

const Navbar = () => {
  const {
    userStore: { user, logout },
  } = useStore()

  return (
    <Menu inverted fixed='top'>
      <Container style={{ display: 'flex' }}>
        <Menu.Item as={NavLink} to='/' header>
          <img
            src={'../../../../assets/logo.png'}
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Activities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities' />
        <Menu.Item as={NavLink} to='/errors' name='Errors' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/create-activity'
            color='teal'
            content='Create Activity'
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Image
            src={user?.image || '../../assets/user.png'}
            avatar
            spaced='right'
          />
          <Dropdown pointing='right' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user?.username}`}
                text='My profile'
                icon='user'
              />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default observer(Navbar)
