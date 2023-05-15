import { useField } from 'formik'
import { Form, Input } from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  type?: string
  label?: string
  icon?: string | JSX.Element
}

const LFormInput = (props: Props) => {
  const [field, meta] = useField(props.name)

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {meta.touched && meta.error ? (
        <Input
          className='errorPlaceholder'
          {...field}
          {...props}
          {...{ placeholder: meta.error }}
        />
      ) : (
        <Input {...field} {...props} />
      )}
    </Form.Field>
  )
}

export default LFormInput
