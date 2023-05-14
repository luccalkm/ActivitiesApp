import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import LFormInput from '../common/forms/LFormInput'
import { Button, Label } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'

export const LoginForm = () => {
  const { userStore } = useStore()

  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: 'Invalid email or password.' }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <LFormInput placeholder='Email' name='email' />
          <LFormInput placeholder='Password' name='password' type='password' />
          <ErrorMessage
            name='error'
            render={() => (
              <Label
                basic
                color='red'
                content={errors.error}
                style={{ marginBottom: 10 }}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content='Login'
            fluid
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}

export default observer(LoginForm)
