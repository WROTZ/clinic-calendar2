import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const navigate = useNavigate();

  // Dummy appointment data (you can replace with dynamic data later)
  const appointments = {
    5: 'Dr. A - 10AM',
    12: 'Dr. B - 3PM',
    18: 'Dr. C - 11AM',
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clinic Appointment Calendar</h2>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-semibold text-gray-700">{day}</div>
        ))}

        {/* Days 1 to 30 with dummy appointments */}
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          return (
            <div key={day} className="border p-3 h-24 rounded shadow hover:bg-blue-50 transition">
              <div className="font-bold">{day}</div>
              <div className="text-xs mt-1 text-gray-600">
                {appointments[day] || 'No Appointments'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
