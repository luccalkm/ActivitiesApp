import { observer } from 'mobx-react-lite'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import LFormInput from '../../common/forms/LFormInput'
import LTextArea from '../../common/forms/LTextArea'
import { Profile } from '../../../../models/profile'
import { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'

interface Props {
  setEditMode: (editMode: boolean) => void
}

const ProfileAboutForm = ({ setEditMode }: Props) => {
  const {
    profileStore: { editProfile, profile },
  } = useStore()

  const validationSchema = Yup.object({
    displayName: Yup.string().required('Display name cannot be empty.'),
  })

  return (
    <Formik
      initialValues={{
        displayName: profile?.displayName,
        bio: profile?.bio || '',
      }}
      onSubmit={(values) => {
        editProfile(values).then(() => {
          setEditMode(false)
        })
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <LFormInput placeholder='Display name' name='displayName' />
          <LTextArea placeholder='Bio' name='bio' rows={5} />
          <Button
            positive
            disabled={!isValid || !dirty}
            loading={isSubmitting}
            fluid
            floated='right'
            content={dirty ? 'Save changes' : 'Nothing to change...'}
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}

export default observer(ProfileAboutForm)
