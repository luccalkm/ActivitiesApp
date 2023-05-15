import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../../../stores/store'
import { Modal } from 'semantic-ui-react'

const ModalContainer = () => {
  const { modalStore } = useStore()

  return (
    <Modal
      style={{ width: '25%' }}
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
    >
      <Modal.Header style={{ color: 'teal', textAlign: 'center' }}>
        {modalStore.modal.title}
      </Modal.Header>
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  )
}

export default observer(ModalContainer)
