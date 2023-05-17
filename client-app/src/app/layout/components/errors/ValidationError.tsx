import { Message } from 'semantic-ui-react'

interface Props {
  errors: any
}

export const ValidationError = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, index: any) => {
            return <Message.Item key={index}>{err}</Message.Item>
          })}
        </Message.List>
      )}
    </Message>
  )
}
