import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../layout/components/ActivityDashboard";
import ActivityForm from "../layout/components/activities/ActivityForm";
import ActivityDetails from "../layout/components/activities/ActivityDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "activities",
        element: <ActivityDashboard />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetails />,
      },
      {
        path: "create-activity",
        element: <ActivityForm key='create'/>,
      },
      {
        path: "manage/:id",
        element: <ActivityForm key='manage'/>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
