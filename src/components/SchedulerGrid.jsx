// src/components/SchedulerGrid.js
import React from 'react';
import SchedulerEvent from './SchedulerEvent';

const SchedulerGrid = ({ events }) => {
  const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="scheduler-grid">
      {/* Render time labels on the left */}
      <div className="scheduler-time-labels">
        {hours.map((hour, index) => (
          <div key={index} className="scheduler-time-label">
            {hour}
          </div>
        ))}
      </div>

      {/* Render day columns */}
      <div className="scheduler-columns">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="scheduler-day-column">
            <div className="scheduler-day-header">{day}</div>

            {/* Render events for the current day */}
            {events
              .filter(event => event.day === day) // Filter events by day
              .map((event, eventIndex) => (
                <SchedulerEvent key={eventIndex} event={event} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulerGrid;
