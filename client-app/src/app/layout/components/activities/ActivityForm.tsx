import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment, Sticky } from 'semantic-ui-react'
import { Activity } from '../../../models/activity'

interface Props {
  closeForm: () => void
  selectedActivity: Activity | undefined
  handleCreateOrEditActivity: (activity: Activity) => void
  submitting: boolean
}

export const ActivityForm = ({
  submitting,
  handleCreateOrEditActivity,
  closeForm,
  selectedActivity,
}: Props) => {
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
          handleCreateOrEditActivity(activity)
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
            loading={submitting}
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

export default ActivityForm
