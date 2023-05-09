import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../../models/activity";
import { useStore } from "../../../../stores/store";
import { SyntheticEvent, useState } from "react";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const [target, setTarget] = useState("");

  const {
    activityStore: { deleteActivity },
  } = useStore();

  const handleTargetDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="../../../../assets/user.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted By Lucca</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon style={{marginLeft: '20px'}} name="marker" /> {activity.venue}
          <Icon style={{marginLeft: '20px'}} name="building" /> {activity.city}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          content="View"
          color="teal"
          floated="right"
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
