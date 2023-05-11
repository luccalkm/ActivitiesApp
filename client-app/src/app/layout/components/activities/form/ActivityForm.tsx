import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../../models/activity";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loading from "../../common/Loading";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
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

  // const handleSubmit = (activity: Activity) => {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
  //   }
  //   else{
  //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
  //   }
  // };

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setActivity({ ...activity, [name]: value });
  // };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    category: Yup.string().required('Category is required.'),
    city: Yup.string().required('City is required.'),
    venue: Yup.string().required('Venue is required.'),

  })

  if (loadingInitial) return <Loading content="Loading activity..." />;

  return (
    <Segment color="blue" clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">

            <LFormInput name='title' placeholder="Title" />
            <LTextArea rows={3} placeholder="Description" name="description" />
            <LSelectInput options={categoryOptions} placeholder="Category" name="category" />
            <LDateInput showTimeSelect timeCaption='time' dateFormat='dd/MM/yyyy HH:mm' name="date" />
            <LFormInput placeholder="City" name="city" />
            <LFormInput placeholder="Venue" name="venue" />

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
                to="/activities"
                className="basic"
                type="button"
                content="Cancel"
                color="red"
              />
            </Button.Group>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
