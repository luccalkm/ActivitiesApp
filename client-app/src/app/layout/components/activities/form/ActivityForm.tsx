import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../../models/activity";
import { Link, useNavigate, useParams } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import Loading from "../../common/Loading";

export const ActivityForm = () => {
  const {
    activityStore: {
      loading,
      loadActivity,
      loadingInitial,
      createActivity,
      updateActivity,
    },
  } = useStore();

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then( activity => setActivity(activity!))
  }, [id, loadActivity])

  const handleSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <Loading content='Loading activity...'/>

  return (
    <Segment color="blue" clearing>
      <Form
        onSubmit={() => {
          handleSubmit(activity);
        }}
      >
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button.Group floated="right" widths="2">
          <Button
            loading={loading}
            className="basic"
            type="submit"
            content="Submit"
            color="blue"
          />
          <Button
            as={Link}
            to='/activities'
            className="basic"
            type="button"
            content="Cancel"
            color="red"
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
