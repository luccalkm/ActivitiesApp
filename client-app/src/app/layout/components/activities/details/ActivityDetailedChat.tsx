import { observer } from 'mobx-react-lite'
import { Segment, Comment, Header, Button } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import LTextArea from '../../common/forms/LTextArea'
import * as Yup from 'yup'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  activityId: string
}

const ActivityDetailedChat = ({ activityId }: Props) => {
  const { commentStore } = useStore()

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId)
    }
    return () => {
      commentStore.clearComments()
    }
  }, [commentStore, activityId])

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment clearing attached>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <Formik
            onSubmit={(values, { resetForm }) =>
              commentStore.addComment(values).then(() => resetForm())
            }
            initialValues={{ body: '' }}
            validationSchema={Yup.object({
              body: Yup.string().required('Comment cannot be empty.'),
            })}
          >
            {({ isSubmitting, isValid, handleSubmit }) => (
              <Form className='ui form' style={{ paddingTop: 10 }}>
                <LTextArea
                  placeholder='Enter you comment (Enter to submit, SHIFT + enter for new line)'
                  name='body'
                  rows={2}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) return
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      isValid && handleSubmit()
                    }
                  }}
                />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  floated='right'
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                  type='submit'
                />
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </>
  )
}

export default observer(ActivityDetailedChat)
