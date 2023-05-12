import { Fragment, useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../../models/activity";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loading from "../../common/Loading";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LTextArea from "./common/LTextArea";
import LFormInput from "./common/LFormInput";
import LSelectInput from "./common/LSelectInput";
import { categoryOptions } from "./common/options/categoryOptions";
import LDateInput from "./common/LDateInput";

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
    date: null,
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = (activity: Activity) => {
    if (activity.id.length === 0) 
    {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
    category: Yup.string().required("Category is required."),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required("City is required."),
    venue: Yup.string().required("Venue is required."),
  });

  if (loadingInitial) return <Loading content="Loading activity..." />;

  return (
    <Fragment>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            {/* First part of form - ACTIVITY DETAILS */}
            <Segment color='teal'>
              <Header content="Activity Details" sub color="teal" />
              <LFormInput name="title" placeholder="Title" />
              <LDateInput
                showTimeSelect
                timeCaption="time"
                dateFormat="dd/MM/yyyy HH:mm"
                name="date"
              />
              <LTextArea
                rows={3}
                placeholder="Description"
                name="description"
              />
              <LSelectInput
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
            </Segment>

            {/* First part of form - LOCATION DETAILS */}
            <Segment color='teal'clearing>
              <Header content="Location Details" sub color="teal" />
              <LFormInput placeholder="City" name="city" />
              <LFormInput placeholder="Venue" name="venue" />
              <Button.Group fluid floated="right">
                <Button
                  animated="vertical"
                  loading={loading}
                  disabled={isSubmitting || !dirty || !isValid}
                  basic
                  color={isSubmitting || !dirty || !isValid ? "black" : "teal"}
                  type="submit"
                >
                  <Button.Content visible>Submit</Button.Content>
                  <Button.Content hidden>
                    <Icon name="checkmark" />
                  </Button.Content>
                </Button>
                <Button
                  animated="vertical"
                  color="red"
                  as={Link}
                  basic
                  to="/activities"
                  type="button"
                >
                  <Button.Content visible>Cancel</Button.Content>
                  <Button.Content hidden>
                    <Icon name="close" />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Segment>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default observer(ActivityForm);
