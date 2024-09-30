// src/components/Scheduler.js
import React, { useState } from 'react';
import SchedulerGrid from './SchedulerGrid';
import '../styles/Scheduler.css';

const Scheduler = () => {
  const [events, setEvents] = useState([
    {
      title: 'Meeting 1',
      startTime: '10:00',
      endTime: '11:00',
      day: 'Monday',
    },
    {
      title: 'Meeting 2',
      startTime: '11:00',
      endTime: '12:00',
      day: 'Tuesday',
    },
    {
      title: 'Lunch Break',
      startTime: '12:00',
      endTime: '13:00',
      day: 'Wednesday',
    },
    {
      title: 'Project Discussion',
      startTime: '14:00',
      endTime: '15:30',
      day: 'Thursday',
    },
  ]);

  return (
    <div className="scheduler-container">
      <SchedulerGrid events={events} />
    </div>
  );
};

export default Scheduler;
