import React from 'react';
import { useNavigate } from 'react-router-dom';

const appointments = {
  5: ['Dr. A - 10AM'],
  12: ['Dr. B - 3PM'],
};

const CalendarView = () => {
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const logout = () => {
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="border p-2 min-h-[80px]"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <div key={i} className="border p-2 min-h-[80px]">
        <p className="font-bold">{i}</p>
        {appointments[i] ? (
          appointments[i].map((appt, idx) => (
            <p key={idx} className="text-sm text-green-700">{appt}</p>
          ))
        ) : (
          <p className="text-xs text-gray-500">No Appointments</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Clinic Appointment Calendar</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700 mb-2">
        <div>Son</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
};

export default CalendarView;
