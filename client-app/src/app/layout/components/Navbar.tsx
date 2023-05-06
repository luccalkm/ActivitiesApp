import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
  openForm: () => void
  cancelSelectActivity: () => void
}

const Navbar = ({ openForm, cancelSelectActivity }: Props) => {
  const logo = require('../../assets/logo.png') ?? 'logo'

  const creatingNewActivity = () => {
    openForm()
    cancelSelectActivity()
  }

  return (
    <Menu inverted fixed='top'>
      <Container style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Menu.Item header>
          <img src={logo} alt='logo' style={{ marginRight: '10px' }} />
          Activities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button
            onClick={creatingNewActivity}
            positive
            content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar
