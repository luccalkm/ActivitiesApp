import { observer } from 'mobx-react-lite'
import {
  Button,
  Card,
  CardGroup,
  Grid,
  Header,
  Image,
  Label,
  Segment,
  Tab,
} from 'semantic-ui-react'
import { Photo } from '../../../../models/profile'
import { useStore } from '../../../../stores/store'
import { useState } from 'react'
import ProfilePhotosSection from './ProfilePhotosSection'
import PhotoUploadWidget from '../../common/imageUpload/PhotoUploadWidget'

interface Props {
  photos: Photo[] | undefined
}

const ProfilePhotos = ({ photos }: Props) => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      setMainPhoto,
      loading,
      deletePhoto,
    },
  } = useStore()

  const [addPhotoMode, setAddPhotoMode] = useState(false)

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false))
  }

  return (
    <Tab.Pane color={photos?.length ? 'teal' : 'red'}>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              basic
              floated='right'
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <ProfilePhotosSection
              isCurrentUser={isCurrentUser}
              loading={loading}
              setMainPhoto={setMainPhoto}
              photos={photos}
              deletePhoto={deletePhoto}
            />
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfilePhotos)
