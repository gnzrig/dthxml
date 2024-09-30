// src/components/SchedulerEvent.js
import React from 'react';

const SchedulerEvent = ({ event }) => {
  const { title, startTime, endTime } = event;

  // Calculate the start time and duration of the event
  const startHour = parseInt(startTime.split(':')[0], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);
  const duration = endHour - startHour;

  return (
    <div
      className="scheduler-event"
      style={{
        top: `${startHour * 50}px`, // Dynamically position the event based on the start time
        height: `${duration * 50}px`, // Set the event height based on duration
      }}
    >
      <strong>{title}</strong>
      <div>{startTime} - {endTime}</div>
    </div>
  );
};

export default SchedulerEvent;
