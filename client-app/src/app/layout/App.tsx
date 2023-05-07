import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import Navbar from './components/Navbar'
import ActivityDashboard from './pages/ActivityDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'

export const App = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)

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
    activity.id
      ? setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((item) => item.id !== id)])
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = []

      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })

      setActivities(activities)
    })
    // axios
    //   .get<Activity[]>('http://localhost:5000/api/activities')
    //   .then((res) => {
    //     setActivities(res.data)
    //   })
  }, [])

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
        />
      </Container>
    </>
  )
}

export default App
