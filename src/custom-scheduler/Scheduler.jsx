import React, { useState } from 'react';
import './style.css';

const initialEvents = [
  {
    title: 'Meeting 1',
    start: '2015-02-12T01:30:00',
    end: '2015-02-12T23:30:00',
    column: 0
  },
  {
    title: 'Meeting 2',
    start: '2015-02-12T10:30:00',
    end: '2015-02-12T12:30:00',
    column: 1
  },
  {
    title: 'Meeting 3',
    start: '2015-02-12T10:30:00',
    end: '2015-02-12T12:30:00',
    column: 2
  },
  {
    title: 'Meeting 4',
    start: '2015-02-12T10:30:00',
    end: '2015-02-12T12:30:00',
    column: 3
  }
];

const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);
const hourOptions = Array.from({ length: 24 }, (_, index) => index); // For the select dropdown
const minuteOptions = [0, 15, 30, 45]; // For the select dropdown (15-minute intervals)

const Scheduler = () => {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    startDate: '',
    startHour: 0,
    startMinute: 0,
    endDate: '',
    endHour: 0,
    endMinute: 0,
    column: null,
    isEdit: false,
    index: null
  });

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const timeToIndex = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return hour + minutes / 60;
  };

  const renderEvents = (hourIndex, columnIndex) => {
    return events.map((event, idx) => {
      const eventStartHour = timeToIndex(event.start);
      const eventEndHour = timeToIndex(event.end);

      const clampedStart = clamp(eventStartHour, 0, 24);
      const clampedEnd = clamp(eventEndHour, 0, 24);

      if (event.column === columnIndex && clampedStart <= hourIndex && clampedEnd > hourIndex) {
        const eventHeight = `${(clampedEnd - clampedStart) * 100}%`;
        const topOffset = `${(clampedStart - hourIndex) * 100}%`;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              backgroundColor: 'blue',
              width: '100%',
              height: eventHeight,
              top: topOffset,
              color: 'white',
              textAlign: 'center',
              zIndex: 1
            }}
            onClick={(e) => handleEditEvent(e, event, idx)}
          >
            {event.title}
          </div>
        );
      }
      return null;
    });
  };

  const handleAddEvent = (hour, column) => {
    setModalData({
      title: '',
      startDate: new Date().toISOString().split('T')[0],
      startHour: hour,
      startMinute: 0,
      endDate: new Date().toISOString().split('T')[0],
      endHour: hour + 1, // Default to one hour duration
      endMinute: 0,
      column: column,
      isEdit: false,
      index: null
    });
    setOpen(true);
  };

  const handleEditEvent = (e, event, index) => {
    e.stopPropagation();
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    
    setModalData({
      title: event.title,
      startDate: event.start.split('T')[0],
      startHour: startDate.getHours(),
      startMinute: startDate.getMinutes(),
      endDate: event.end.split('T')[0],
      endHour: endDate.getHours(),
      endMinute: endDate.getMinutes(),
      column: event.column,
      isEdit: true,
      index: index
    });
    setOpen(true);
  };

  const handleSaveEvent = () => {
    const { title, startDate, startHour, startMinute, endDate, endHour, endMinute, column, isEdit, index } = modalData;
    
    const startTime = new Date(`${startDate}T${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`).toISOString();
    const endTime = new Date(`${endDate}T${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`).toISOString();

    if (isEdit) {
      const updatedEvents = [...events];
      updatedEvents[index] = {
        ...updatedEvents[index],
        title: title,
        start: startTime,
        end: endTime
      };
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: title,
        start: startTime,
        end: endTime,
        column: column
      };
      setEvents([...events, newEvent]);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <table style={{ position: 'relative', border: '1px solid #ddd' }}>
        <thead>
          <tr>
            <th style={{ width: '50px', textAlign: 'center' }}>Hours</th>
            {initialEvents.map((data, index) => (
              <th key={index} style={{ textAlign: 'center' }}>
                {`Column ${index + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIdx) => (
            <tr key={hourIdx}>
              <td style={{ textAlign: 'center', border: '1px solid #ddd' }}>{hour}</td>
              {initialEvents.map((_, colIdx) => (
                <td
                  key={colIdx}
                  style={{ position: 'relative', height: '50px', border: '1px solid #ddd' }}
                  onClick={() => handleAddEvent(hourIdx, colIdx)}
                >
                  {renderEvents(hourIdx, colIdx)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="modal-bg">
          <div className="modal-container">
            <div>
              <p>Title</p>
              <input
                className="scheduler-input"
                name="title"
                value={modalData.title}
                onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
              />
            </div>
            <div className="scheduler-row">
              <label>Start:</label>
              <input
                className="scheduler-input"
                type="date"
                name="startDate"
                value={modalData.startDate}
                onChange={(e) => setModalData({ ...modalData, startDate: e.target.value })}
                style={{ width: '120px' }}
              />
              <select
                value={modalData.startHour}
                onChange={(e) => setModalData({ ...modalData, startHour: parseInt(e.target.value) })}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                value={modalData.startMinute}
                onChange={(e) => setModalData({ ...modalData, startMinute: parseInt(e.target.value) })}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {String(minute).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div className="scheduler-row">
              <label>End:</label>
              <input
                className="scheduler-input"
                type="date"
                name="endDate"
                value={modalData.endDate}
                onChange={(e) => setModalData({ ...modalData, endDate: e.target.value })}
                style={{ width: '120px' }}
              />
              <select
                value={modalData.endHour}
                onChange={(e) => setModalData({ ...modalData, endHour: parseInt(e.target.value) })}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                value={modalData.endMinute}
                onChange={(e) => setModalData({ ...modalData, endMinute: parseInt(e.target.value) })}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {String(minute).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleSaveEvent}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
