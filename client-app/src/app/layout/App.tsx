import { Container } from 'semantic-ui-react'
import Navbar from './components/common/Navbar'
import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import Loading from './components/common/Loading'
import ModalContainer from './components/common/modals/ModalContainer'

export const App = () => {
  const location = useLocation()
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <Loading content='Loading App...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' theme='colored' />
      {location.pathname === '/' ? (
        <Home />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default observer(App)
