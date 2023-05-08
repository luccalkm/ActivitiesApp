import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

export const ActivityList = () => {
  const [target, setTarget] = useState("");

  const {
    activityStore,
    activityStore: { deleteActivity, activitiesByDate, loading },
  } = useStore();

  const handleTargetDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
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
                  onClick={() => {
                    activityStore.selectActivity(activity.id);
                  }}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
