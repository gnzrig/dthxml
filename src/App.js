import './App.css'
import React from 'react';
import Scheduler from './custom-scheduler/Scheduler';
import './styles/Scheduler.css'; // Import CSS styles

function App() {
  return (
    <div className="App">
      <h1>Custom Scheduler</h1>
      <Scheduler />
    </div>
  );
}

export default App;
