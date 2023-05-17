import { observer } from 'mobx-react-lite'
import { useStore } from '../../../stores/store'
import { Container, Header, Segment } from 'semantic-ui-react'

export const ServerError = () => {
  const { commonStore } = useStore()

  return (
    <Container>
      <Header as='h1' content='Server Error' />
      <Header as='h5' color='red' content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as='h4' color='teal' content='Stack Trace' />
          <code style={{ marginTop: 10 }}>{commonStore.error.details}</code>
        </Segment>
      )}
    </Container>
  )
}

export default observer(ServerError)
