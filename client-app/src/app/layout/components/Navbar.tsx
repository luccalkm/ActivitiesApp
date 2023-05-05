import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

const Navbar = () => {
  const logo = require('../../assets/logo.png') ?? 'logo';
  
  return (
    
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src={logo} alt='logo' style={{marginRight: '10px'}}/>
          Activities
        </Menu.Item>
        <Menu.Item name='Activities'/>
        <Menu.Item>
          <Button positive content='Create Activity' />
        </Menu.Item>
      </Container>C:\tmp\ActiviesProject\ActiviesApp\client-app\src\images\logo.png
    </Menu>
  )
}

export default Navbar
