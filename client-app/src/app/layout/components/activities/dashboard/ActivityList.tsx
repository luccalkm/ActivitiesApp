import {  Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

export const ActivityList = () => {
  const {
    activityStore: { groupedActivities, activityRegistry },
  } = useStore();

  if(activityRegistry.size === 0)
  {
    return (
      <Segment style={{marginTop: 25}}>
        <Header style={{padding: 15}} as='h3' color='teal' content='No activities found...' />
      </Segment>
    )
  }

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal' >
            {group}
          </Header>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
