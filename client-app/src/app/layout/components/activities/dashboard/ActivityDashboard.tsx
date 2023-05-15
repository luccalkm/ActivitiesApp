import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Loading from '../../common/Loading'
import ActivityFilters from './ActivityFilters'

export const ActivityDashboard = () => {
  const {
    activityStore: { loadActivities, activityRegistry, loadingInitial },
  } = useStore()

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities()
  }, [loadActivities, activityRegistry.size])

  if (loadingInitial) {
    return <Loading content='Loading activities...' />
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
