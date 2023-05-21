import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'
import LFormInput from '../common/forms/LFormInput'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'

export const LoginForm = () => {
  const { userStore } = useStore()
  const [type, setType] = useState<string>('password')
  const [check, setCheck] = useState<boolean>(false)

  const changeInputType = () => {
    if (!check) {
      setType('text')
      setCheck(true)
    } else {
      setType('password')
      setCheck(false)
    }
  }

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
          {/* <Header color='teal' textAlign='center' as='h2' content='Login' /> */}
          <LFormInput placeholder='Email' name='email' />
          <LFormInput
            placeholder='Password'
            name='password'
            type={type}
            icon={
              check ? (
                <Icon link onClick={changeInputType} name='eye slash' />
              ) : (
                <Icon link onClick={changeInputType} name='eye' />
              )
            }
          />
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
