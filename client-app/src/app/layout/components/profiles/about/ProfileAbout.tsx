import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button, Grid, Header, Tab } from 'semantic-ui-react'
import { Profile } from '../../../../models/profile'
import { useStore } from '../../../../stores/store'
import ProfileAboutForm from './ProfileAboutForm'

interface Props {
  profile: Profile
}

const ProfileAbout = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const {
    profileStore: { isCurrentUser },
  } = useStore()

  return (
    <Tab.Pane color='teal'>
      <Grid>
        <Grid.Column width={16} tyle={{ paddingBottom: 0 }}>
          <Header floated='left' as='h2' content={profile.displayName} />
          {isCurrentUser && (
            <Button
              basic
              floated='right'
              color={editMode ? 'red' : 'teal'}
              icon={editMode ? 'close' : 'pencil'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16} style={{ paddingTop: 0 }}>
          {editMode && isCurrentUser ? (
            <ProfileAboutForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap', fontSize: 16 }}>
              {profile.bio}
            </span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfileAbout)
