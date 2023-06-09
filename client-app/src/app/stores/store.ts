import { createContext, useContext } from 'react'
import ActivityStore from './activityStore'
import CommonStore from './commonStore'
import UserStore from './userStore'
import ModalStore from './modalStore'
import ProfileStore from './profileStore'
import CommentStore from './commentStore'

// Type all stores
interface Store {
  activityStore: ActivityStore
  commonStore: CommonStore
  userStore: UserStore
  modalStore: ModalStore
  profileStore: ProfileStore
  commentStore: CommentStore
}

// Initialize all stores
export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
}

// Center all stores on variable & React Context
export const StoreContext = createContext(store)

// Use all stores variable with React Context
export const useStore = () => {
  return useContext(StoreContext)
}
