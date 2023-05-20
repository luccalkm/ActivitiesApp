import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { useParams } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import { useEffect } from 'react'
import Loading from '../common/Loading'

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const {
    profileStore: { loadingProfile, loadProfile, profile },
  } = useStore()

  useEffect(() => {
    if (username) loadProfile(username)
  }, [loadProfile, username])

  if (loadingProfile) return <Loading content='Loading profile...' />

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ProfilePage)
