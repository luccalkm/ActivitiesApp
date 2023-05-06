import { Grid } from 'semantic-ui-react'
import { Activity } from '../../models/activity'
import ActivityList from '../components/activities/ActivityList'
import ActivityDetails from '../components/activities/ActivityDetails'
import ActivityForm from '../components/activities/ActivityForm'

interface Props {
  activities: Activity[]
  selectedActivity: Activity | undefined
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  editMode: boolean
  openForm: (id: string) => void
  closeForm: () => void
}

export const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width='9'>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width='7'>
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            selectedActivity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
