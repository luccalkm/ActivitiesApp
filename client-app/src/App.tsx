import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(res => {
      console.log(res.data);
      setActivities(res.data);
    })
  },[])

  return (
    <div className="App">
      <h1>Activities</h1>
      <ul>
        {activities.map((activity: any) => {
          return <li key={activity.id}>{activity.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
