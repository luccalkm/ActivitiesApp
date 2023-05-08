import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import ActivityDashboard from "./pages/ActivityDashboard";
import Loading from "./components/Loading";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export const App = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading app..." />;
  }

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);