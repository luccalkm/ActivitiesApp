import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'
import LFormInput from '../common/forms/LFormInput'
import { Button, Icon } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { ValidationError } from '../errors/ValidationError'

const RegisterForm = () => {
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
      initialValues={{
        displayName: '',
        username: '',
        email: '',
        password: '',
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        password: Yup.string().required(),
        email: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className='ui form error'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          {/* <Header color='teal' textAlign='center' as='h2' content='Sign up' /> */}
          <LFormInput placeholder='Display Name' name='displayName' />
          <LFormInput placeholder='Username' name='username' />
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
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            disabled={!isValid || isSubmitting || !dirty}
            loading={isSubmitting}
            positive
            content='Register'
            fluid
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}

export default observer(RegisterForm)
