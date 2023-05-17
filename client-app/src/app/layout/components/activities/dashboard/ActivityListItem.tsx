import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../../models/activity'
import { format } from 'date-fns'
import ActivityListItemAttendee from './ActivityListItemAttendee'

interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached='top'
            color='red'
            content='Cancelled'
            style={{ textAlign: 'center' }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size='tiny'
              circular
              src='../../../../assets/user.png'
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted By {activity.host?.displayName}
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    You are going to this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(activity.date!, 'dd/MM/yyyy hh:mm')}
          <Icon style={{ marginLeft: '20px' }} name='marker' /> {activity.venue}
          <Icon style={{ marginLeft: '20px' }} name='building' />{' '}
          {activity.city}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          content='View'
          color='teal'
          floated='right'
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityListItem)
