import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

const Navbar = () => {
  const logo = require('../../assets/logo.png') ?? 'logo'

  const {activityStore} = useStore(); 

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
            onClick={() => activityStore.openForm()}
            positive
            content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default observer(Navbar)
