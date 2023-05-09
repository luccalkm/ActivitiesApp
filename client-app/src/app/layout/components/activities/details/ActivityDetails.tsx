import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'
import Loading from '../../common/Loading';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const ActivityDetails = () => {
  
  const { activityStore: {
    selectedActivity: activity, loadActivity, loadingInitial
  } } = useStore()

  const { id } = useParams();

  useEffect(() => {
    if(id) loadActivity(id);

  }, [id, loadActivity])

  if(loadingInitial || !activity) return <Loading />;

  return (
  <Card  fluid>
    <Image
      src={
        require(`../../../../assets/categoryImages/${activity.category}.jpg`)
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
          as={Link}
          to={`/manage/${activity.id}`}
          basic
          color='blue'
          content='Edit'
        />
        <Button
          as={Link}
          to='/activities'
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