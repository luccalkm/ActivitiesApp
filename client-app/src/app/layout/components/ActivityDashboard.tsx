import { Grid } from "semantic-ui-react";
import ActivityList from "./activities/ActivityList";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "./Loading";

export const ActivityDashboard = () => {
  const {
    activityStore: {
      loadActivities,
      activityRegistry,
      loadingInitial
    }
  } = useStore();

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  if (loadingInitial) {
    return <Loading content="Loading app..." />;
  }

  return (
    <Grid>
      <Grid.Column width="9">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="7">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
