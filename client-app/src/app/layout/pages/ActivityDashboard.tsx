import { Grid } from "semantic-ui-react";
import ActivityList from "../components/activities/ActivityList";
import ActivityDetails from "../components/activities/ActivityDetails";
import ActivityForm from "../components/activities/ActivityForm";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export const ActivityDashboard = () => {
  const {
    activityStore: { selectedActivity, editMode },
  } = useStore();

  return (
    <Grid>
      <Grid.Column width="9">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="7">
        {selectedActivity && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
