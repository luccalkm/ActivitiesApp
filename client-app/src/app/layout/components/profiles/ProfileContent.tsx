import { observer } from 'mobx-react-lite'
import { Tab } from 'semantic-ui-react'
import { Profile } from '../../../models/profile'
import ProfilePhotos from './photos/ProfilePhotos'
import ProfileAbout from './about/ProfileAbout'

interface Props {
  profile: Profile
}

export const ProfileContent = ({ profile }: Props) => {
  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
    {
      menuItem: 'Photos',
      render: () => <ProfilePhotos photos={profile.photos} />,
    },
    { menuItem: 'Event', render: () => <Tab.Pane>Event Content</Tab.Pane> },
    {
      menuItem: 'Followers',
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: 'Following',
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ]

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  )
}

export default observer(ProfileContent)
