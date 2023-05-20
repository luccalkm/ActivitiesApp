import React from 'react'
import { Profile } from '../../../models/profile'
import { observer } from 'mobx-react-lite'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

interface Props {
  profile: Profile
}

export const ProfileCard = ({ profile }: Props) => {
  const truncateBio = (text: string | undefined) => {
    if (text) return text.length > 40 ? text.substring(0, 37) + '...' : text
  }

  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '../../assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncateBio(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        17 followers
      </Card.Content>
    </Card>
  )
}

export default observer(ProfileCard)
