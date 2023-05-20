import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import {
  Image,
  Card,
  CardGroup,
  Label,
  ButtonGroup,
  Button,
} from 'semantic-ui-react'
import { Photo } from '../../../models/profile'

interface Props {
  photos: Photo[] | undefined
  setMainPhoto: (photo: Photo) => void
  deletePhoto: (photo: Photo) => Promise<void>
  loading: boolean
  isCurrentUser: boolean
}

const ProfilePhotosSection = ({
  isCurrentUser,
  photos,
  setMainPhoto,
  loading,
  deletePhoto,
}: Props) => {
  const [target, setTarget] = useState('')
  const [localPhotos, setLocalPhotos] = useState<Photo[] | undefined>(photos)

  const handleClicking = () => {}

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name)
    setMainPhoto(photo)
  }

  const handleDeletePhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name)
    deletePhoto(photo).then(() => {
      if (localPhotos)
        setLocalPhotos(localPhotos.filter((p) => p.id !== photo.id))
    })
  }

  return localPhotos?.length ? (
    <CardGroup itemsPerRow={5}>
      {localPhotos.map((photo) => (
        <Card key={photo.id}>
          <Image src={photo.url} />
          {isCurrentUser && (
            <ButtonGroup fluid widths={2}>
              <Button
                basic
                color='teal'
                icon={photo.isMain ? 'user circle' : 'check'}
                name={'main' + photo.id}
                disabled={photo.isMain}
                loading={target === 'main' + photo.id && loading}
                onClick={(e) => handleSetMainPhoto(photo, e)}
              />
              <Button
                basic
                color='red'
                icon='trash'
                loading={target === photo.id && loading}
                name={photo.id}
                onClick={(e) => handleDeletePhoto(photo, e)}
                disabled={photo.isMain}
              />
            </ButtonGroup>
          )}
        </Card>
      ))}
    </CardGroup>
  ) : (
    <Label
      attached='bottom'
      style={{
        background: '#c54949',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      You have no photos uploaded!
    </Label>
  )
}

export default observer(ProfilePhotosSection)
