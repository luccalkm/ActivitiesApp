import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import Navbar from './components/Navbar'
import ActivityDashboard from './pages/ActivityDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import Loading from './components/Loading'

export const App = () => {
  // App state variables
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id))
  }

  const cancelSelectActivity = () => {
    setSelectedActivity(undefined)
    if (editMode) {
      setEditMode(false)
    }
  }

  const openForm = (id?: string) => {
    id ? selectActivity(id) : cancelSelectActivity()
    setEditMode(true)
  }

  const closeForm = () => {
    setEditMode(false)
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((item) => item.id !== id)])
      setSubmitting(false)
    })
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = []

      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })

      setActivities(activities)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading content='Loading app...' />
  }

  return (
    <>
      <Navbar openForm={openForm} cancelSelectActivity={cancelSelectActivity} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={selectActivity}
          cancelSelectActivity={cancelSelectActivity}
          editMode={editMode}
          openForm={openForm}
          handleDeleteActivity={handleDeleteActivity}
          closeForm={closeForm}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
