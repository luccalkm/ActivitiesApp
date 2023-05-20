import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  GridColumn,
  Header,
  Image,
} from 'semantic-ui-react'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import PhotoWidgetCropper from './PhotoWidgetCropper'

interface Props {
  loading: boolean
  uploadPhoto: (file: Blob) => void
}

const PhotoUploadWidget = ({ uploadPhoto, loading }: Props) => {
  const [files, setFiles] = useState<any>([])
  const [cropper, setCropper] = useState<Cropper>()

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!))
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  return (
    <Grid>
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 1 - Add image' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </GridColumn>
      <Grid.Column width={1} />
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 2 - Resize image' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </GridColumn>
      <Grid.Column width={1} />
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 3 - Preview and Upload' />
        {files && files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, overflow: 'hidden' }}
            />
            <ButtonGroup widths={2}>
              <Button
                loading={loading}
                onClick={onCrop}
                color='teal'
                icon='check'
              />
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                color='red'
                icon='close'
              />
            </ButtonGroup>
          </>
        )}
      </GridColumn>
    </Grid>
  )
}

export default observer(PhotoUploadWidget)
