import { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './components/Navbar';

export const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(res => {
      setActivities(res.data);
    })
  },[])

  return (
    <div>
      <Navbar />
      <List>
        {activities.map((activity) => {
          return <List.Item key={activity.id}>{activity.id} - {activity.title}</List.Item>
        })}
      </List>
    </div>
  );
}

export default App;
