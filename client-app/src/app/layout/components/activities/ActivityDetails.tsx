import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../models/activity'

interface Props {
  activity: Activity
  cancelSelectActivity: () => void
  openForm: (id: string) => void
}

export const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) => (
  <Card fluid>
    <Image
      src={
        require(`../../../assets/categoryImages/${activity.category}.jpg`) ||
        'picture'
      }
    />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>`{activity.date}`</span>
      </Card.Meta>
      <Card.Description>{activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button
          onClick={() => openForm(activity.id)}
          basic
          color='blue'
          content='Edit'
        />
        <Button
          onClick={cancelSelectActivity}
          basic
          color='red'
          content='Cancel'
        />
      </Button.Group>
    </Card.Content>
  </Card>
)

export default ActivityDetails
