import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react'
import anonymousUser from '../../../assets/user.png'
import { Profile } from '../../../models/profile'
import { observer } from 'mobx-react-lite'

interface Props {
  profile: Profile | null
}

const ProfileHeader = ({ profile }: Props) => (
  <Segment>
    <Grid>
      <Grid.Column width={12}>
        <Item.Group>
          <Item>
            <Item.Image size='small' src={profile?.image || anonymousUser} />
            <Item.Content verticalAlign='middle'>
              <Header as='h1' content={profile?.displayName} />
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={4}>
        <Statistic.Group width={2}>
          <Statistic label='Followers' value='12' />
          <Statistic label='Following' value='42' />
        </Statistic.Group>
        <Divider />
        <Reveal animated='move'>
          <Reveal.Content visible style={{ width: '100%' }}>
            <Button fluid color='teal' content='Follow' />
          </Reveal.Content>
          <Reveal.Content hidden style={{ width: '100%' }}>
            <Button
              basic
              fluid
              color={true ? 'red' : 'teal'}
              content='Unfollow'
            />
          </Reveal.Content>
        </Reveal>
      </Grid.Column>
    </Grid>
  </Segment>
)

export default observer(ProfileHeader)
