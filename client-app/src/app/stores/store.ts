import { createContext, useContext } from 'react'
import ActivityStore from './activityStore'
import CommonStore from './commonStore'
import UserStore from './userStore'

// Type all stores
interface Store {
  activityStore: ActivityStore
  commonStore: CommonStore
  userStore: UserStore
}

// Initialize all stores
export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
}

// Center all stores on variable & React Context
export const StoreContext = createContext(store)

// Use all stores variable with React Context
export const useStore = () => {
  return useContext(StoreContext)
}
