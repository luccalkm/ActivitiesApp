import { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../models/activity'

export const ActivityForm = () => {

  const {activityStore: { selectedActivity, closeForm, loading, createActivity, updateActivity }} = useStore();

  const [activity, setActivity] = useState(
    selectedActivity ?? {
      id: '',
      title: '',
      date: '',
      description: '',
      category: '',
      city: '',
      venue: '',
    }
  )

  const handleSubmit = (activity: Activity) => {
    activity.id ? updateActivity(activity) : createActivity(activity)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setActivity({ ...activity, [name]: value })
  }

  return (
    <Segment color='blue' clearing>
      <Form
        onSubmit={() => {
          handleSubmit(activity)
        }}
      >
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button.Group floated='right' widths='2'>
          <Button
            loading={loading}
            className='basic'
            type='submit'
            content='Submit'
            color='blue'
          />
          <Button
            onClick={closeForm}
            className='basic'
            type='button'
            content='Cancel'
            color='red'
          />
        </Button.Group>
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
