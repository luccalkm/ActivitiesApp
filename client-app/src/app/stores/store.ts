import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

// Type all stores
interface Store {
  activityStore: ActivityStore
}

// Initialize all stores
export const store: Store = {
  activityStore: new ActivityStore()
}

// Center all stores on variable & React Context
export const StoreContext = createContext(store)

// Use all stores variable with React Context
export const useStore = () => {
  return useContext(StoreContext)
}