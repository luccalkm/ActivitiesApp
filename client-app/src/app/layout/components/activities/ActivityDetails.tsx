import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import Loading from '../Loading';
import { observer } from 'mobx-react-lite';

export const ActivityDetails = () => {
  
  const {activityStore, activityStore: {
    selectedActivity: activity
  } } = useStore()

  if(!activity) return <Loading />;

  return (
  <Card fluid>
    <Image
      loading={activityStore.loading}
      src={
        require(`../../../assets/categoryImages/${activity.category}.jpg`)
      }
    />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>{activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button
          onClick={() => activityStore.openForm(activity.id)}
          basic
          color='blue'
          content='Edit'
        />
        <Button
          onClick={activityStore.cancelSelectedActivity}
          basic
          color='red'
          content='Cancel'
        />
      </Button.Group>
    </Card.Content>
  </Card>
  )
}

export default observer(ActivityDetails)
