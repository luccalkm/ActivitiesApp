import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'
import Loading from '../../common/Loading'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import { useParams } from 'react-router-dom'

export const ActivityDetails = () => {
  const {
    activityStore: {
      selectedActivity: activity,
      loadActivity,
      loadingInitial,
      clearSelectedActivity,
    },
  } = useStore()

  const { id } = useParams()

  useEffect(() => {
    if (id) loadActivity(id)
    return () => clearSelectedActivity()
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <Loading />

  return (
    <Grid>
      <Grid.Column width={9}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={7}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails)
