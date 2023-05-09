import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../../models/activity';
import { useStore } from '../../../../stores/store';
import { SyntheticEvent, useState } from 'react';

interface Props {
  activity: Activity
}

const ActivityListItem = ({activity}: Props) => {
  const [target, setTarget] = useState("");

  const {
    activityStore: { deleteActivity, loading },
  } = useStore();

  const handleTargetDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };
  
  return (
    <Item key={activity.id}>
    <Item.Content>
      <Item.Header as="a">{activity.title}</Item.Header>
      <Item.Meta>{activity.date}</Item.Meta>
      <Item.Description>
        <div>{activity.description}</div>
        <div>
          {activity.city}, {activity.venue}
        </div>
      </Item.Description>
      <Item.Extra>
        <Button
          name={activity.id}
          loading={loading && target === activity.id}
          onClick={(e) => {
            handleTargetDelete(e, activity.id);
          }}
          floated="right"
          content="Delete"
          color="red"
        />
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
        <Label basic content={activity.category} />
      </Item.Extra>
    </Item.Content>
  </Item>
  )
}

export default observer(ActivityListItem)
