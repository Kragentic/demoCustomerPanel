import React, { useState, useEffect } from "react";
import { 
  Home, MessageCircle, Calendar, DollarSign, Users, 
  Phone, ClipboardList, BookOpen, Settings, BarChart2,
  Search, Filter, Plus, ChevronRight, ChevronLeft,
  Play, RotateCcw, Mail, MessageSquare, MapPin, Clock,
  User, ArrowRight, CheckCircle, XCircle, Edit2
} from "lucide-react";

const CalendarView = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'crew'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [draggedAppointment, setDraggedAppointment] = useState(null);

  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      client: 'Sarah Johnson', 
      address: '123 Main St, Beverly Hills, CA 90210',
      phone: '(555) 123-4567',
      date: '2024-01-15', 
      time: '9:00',
      service: 'Deep Clean - 3 Bed / 2 Bath',
      size: '2200 sqft',
      crew: 'Team A',
      status: 'confirmed',
      notes: 'Front gate code: 1234. Please use back entrance.',
      price: '$220'
    },
    { 
      id: 2, 
      client: 'Robert Taylor', 
      address: '456 Oak Ave, West Hollywood, CA 90069',
      phone: '(555) 234-5678',
      date: '2024-01-15', 
      time: '13:00',
      service: 'Regular Clean - 2 Bed / 1 Bath',
      size: '1400 sqft',
      crew: 'Team B',
      status: 'confirmed',
      notes: 'Pet dog - friendly but barks at strangers.',
      price: '$150'
    },
    { 
      id: 3, 
      client: 'Jennifer Lee', 
      address: '789 Pine St, Santa Monica, CA 90401',
      phone: '(555) 345-6789',
      date: '2024-01-16', 
      time: '10:00',
      service: 'Move-in/out Clean - 2 Bed / 2 Bath',
      size: '1800 sqft',
      crew: 'Team A',
      status: 'confirmed',
      notes: 'Apartment 4B. Keys with front desk.',
      price: '$280'
    },
    { 
      id: 4, 
      client: 'Michael Chen', 
      address: '321 Elm St, Culver City, CA 90230',
      phone: '(555) 456-7890',
      date: '2024-01-17', 
      time: '11:00',
      service: 'Deep Clean - 4 Bed / 3 Bath',
      size: '3100 sqft',
      crew: 'Team C',
      status: 'rescheduled',
      notes: 'Pool cleaning included. Gate code: 5678.',
      price: '$350'
    },
    { 
      id: 5, 
      client: 'Lisa Rodriguez', 
      address: '654 Maple Dr, Venice, CA 90291',
      phone: '(555) 567-8901',
      date: '2024-01-18', 
      time: '14:00',
      service: 'Regular Clean - 1 Bed / 1 Bath',
      size: '850 sqft',
      crew: 'Team B',
      status: 'cancelled',
      notes: 'Client cancelled due to family emergency.',
      price: '$120'
    }
  ]);

  // Mock data for crews
  const crews = [
    { 
      name: 'Team A', 
      members: ['Alex Johnson', 'Taylor Smith'],
      phone: '(555) 111-2222',
      utilization: 85,
      jobs: [
        { id: 1, client: 'Sarah Johnson', date: 'Jan 15', time: '9:00 AM', status: 'confirmed' },
        { id: 3, client: 'Jennifer Lee', date: 'Jan 16', time: '10:00 AM', status: 'confirmed' },
        { id: 6, client: 'David Kim', date: 'Jan 17', time: '8:00 AM', status: 'confirmed' }
      ],
      availability: 'Mon-Fri 8am-5pm'
    },
    { 
      name: 'Team B', 
      members: ['Jordan Lee', 'Casey Brown'],
      phone: '(555) 222-3333',
      utilization: 72,
      jobs: [
        { id: 2, client: 'Robert Taylor', date: 'Jan 15', time: '1:00 PM', status: 'confirmed' },
        { id: 5, client: 'Lisa Rodriguez', date: 'Jan 18', time: '2:00 PM', status: 'cancelled' },
        { id: 7, client: 'Emma Wilson', date: 'Jan 19', time: '9:30 AM', status: 'confirmed' }
      ],
      availability: 'Mon-Fri 8am-5pm'
    },
    { 
      name: 'Team C', 
      members: ['Morgan Davis', 'Riley Garcia'],
      phone: '(555) 333-4444',
      utilization: 91,
      jobs: [
        { id: 4, client: 'Michael Chen', date: 'Jan 17', time: '11:00 AM', status: 'rescheduled' },
        { id: 8, client: 'James Miller', date: 'Jan 20', time: '10:00 AM', status: 'confirmed' }
      ],
      availability: 'Mon-Sat 7am-6pm'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDate, targetTime) => {
    e.preventDefault();
    if (!draggedAppointment) return;

    // Create updated appointment with new date/time
    const updatedAppointment = {
      ...draggedAppointment,
      date: targetDate,
      time: targetTime,
      status: 'rescheduled'
    };

    // Update the appointments list
    setAppointments(prev => prev.map(appt => 
      appt.id === draggedAppointment.id ? updatedAppointment : appt
    ));

    // Show success notification
    alert(`Appointment for ${draggedAppointment.client} has been rescheduled to ${targetDate} at ${targetTime}. AI bot will automatically notify the client and update HCP.`);
    
    setDraggedAppointment(null);
    setSelectedAppointment(updatedAppointment);
  };

  const CalendarView = () => {
    const [selectedDate, setSelectedDate] = useState('2024-01-15');
    const [viewType, setViewType] = useState('day'); // 'day' or 'week'

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

    const getHoursForDay = (date) => {
      return hours.map(hour => {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        return {
          time,
          appointments: appointments.filter(appt => appt.date === date && appt.time === time)
        };
      });
    };

    const DayView = () => {
      const hoursData = getHoursForDay(selectedDate);

      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Calendar View - Day</h3>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2024-01-15">Jan 15, 2024</option>
                  <option value="2024-01-16">Jan 16, 2024</option>
                  <option value="2024-01-17">Jan 17, 2024</option>
                  <option value="2024-01-18">Jan 18, 2024</option>
                  <option value="2024-01-19">Jan 19, 2024</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex">
              {/* Time column */}
              <div className="w-20 flex-shrink-0 border-r border-gray-200">
                <div className="h-16"></div>
                {hours.map(hour => (
                  <div key={hour} className="h-16 border-b border-gray-100 text-xs text-gray-500 p-2">
                    {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </div>
                ))}
              </div>

              {/* Main calendar grid */}
              <div className="flex-1">
                <div className="h-16 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                  <span className="font-medium text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                {hoursData.map(({ time, appointments }) => (
                  <div 
                    key={time}
                    className="h-16 border-b border-gray-100 relative hover:bg-gray-50 transition-colors duration-150"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, selectedDate, time)}
                  >
                    {appointments.map(appt => (
                      <div
                        key={appt.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, appt)}
                        onClick={() => setSelectedAppointment(appt)}
                        className={`absolute left-1 right-1 top-1 bottom-1 rounded border cursor-pointer text-xs p-1 ${
                          getStatusColor(appt.status)
                        } hover:shadow transition-shadow duration-200`}
                        style={{ minHeight: '20px' }}
                      >
                        <div className="font-medium truncate">{appt.client}</div>
                        <div className="truncate">{appt.service}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span>{appt.crew}</span>
                          <span className="text-xs opacity-75">{appt.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };

    const WeekView = () => {
      const weekDates = ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21'];
      const hoursData = hours.map(hour => {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        return {
          time,
          days: weekDates.map(date => ({
            date,
            appointments: appointments.filter(appt => appt.date === date && appt.time === time)
          }))
        };
      });

      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Calendar View - Week</h3>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  ← Previous Week
                </button>
                <span className="text-sm font-medium text-gray-900">Jan 15 - Jan 21, 2024</span>
                <button className="text-gray-600 hover:text-gray-900">
                  Next Week →
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex">
              {/* Time column */}
              <div className="w-20 flex-shrink-0 border-r border-gray-200">
                <div className="h-16"></div>
                {hours.map(hour => (
                  <div key={hour} className="h-16 border-b border-gray-100 text-xs text-gray-500 p-2">
                    {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {weekDates.map((date, dayIndex) => (
                <div key={date} className="flex-1">
                  <div className={`h-16 border-b border-gray-200 flex items-center justify-center ${
                    dayIndex >= 5 ? 'bg-gray-50' : ''
                  }`}>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">
                        {days[dayIndex]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(date).getDate()}
                      </div>
                    </div>
                  </div>
                  
                  {hoursData.map(({ time, days }) => {
                    const dayData = days[dayIndex];
                    return (
                      <div 
                        key={time}
                        className="h-16 border-b border-gray-100 relative hover:bg-gray-50 transition-colors duration-150"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, dayData.date, time)}
                      >
                        {dayData.appointments.map(appt => (
                          <div
                            key={appt.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, appt)}
                            onClick={() => setSelectedAppointment(appt)}
                            className={`absolute left-1 right-1 top-1 bottom-1 rounded border cursor-pointer text-xs p-1 ${
                              getStatusColor(appt.status)
                            } hover:shadow transition-shadow duration-200`}
                            style={{ minHeight: '20px' }}
                          >
                            <div className="font-medium truncate">{appt.client}</div>
                            <div className="truncate">{appt.crew}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return viewType === 'day' ? <DayView /> : <WeekView />;
  };

  const CrewView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Crew Management</h2>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
            <option>This Week</option>
            <option>Last Week</option>
            <option>Next Week</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            + Assign Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {crews.map((crew) => (
          <div key={crew.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{crew.name}</h3>
                  <p className="text-sm text-gray-600">{crew.availability}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{crew.utilization}%</div>
                  <div className="text-sm text-gray-500">Utilization</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                {crew.members.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{member}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {crew.phone}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">This Week's Schedule</h4>
              <div className="space-y-3">
                {crew.jobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => setSelectedAppointment(appointments.find(a => a.id === job.id))}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{job.client}</div>
                        <div className="text-xs text-gray-600">{job.date} • {job.time}</div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        job.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        job.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Jobs</span>
                  <span className="font-medium text-gray-900">{crew.jobs.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AppointmentDetailPanel = () => (
    selectedAppointment && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
        <div className="bg-white w-96 h-full shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.client}</h3>
                <p className="text-gray-600">{selectedAppointment.address}</p>
              </div>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Appointment Details</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {new Date(selectedAppointment.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {selectedAppointment.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedAppointment.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{selectedAppointment.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{selectedAppointment.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crew:</span>
                  <span className="font-medium">{selectedAppointment.crew}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Client Notes</h4>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                {selectedAppointment.notes}
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Client
              </button>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Text Client
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Appointment
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Reschedule Options</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => alert('AI bot will contact the client to confirm new time and update HCP automatically')}
                  className="w-full bg-yellow-100 text-yellow-800 py-2 rounded-lg hover:bg-yellow-200 transition-colors duration-200 text-sm"
                >
                  Reschedule Appointment
                </button>
                <button 
                  onClick={() => alert('AI bot will contact the client to confirm cancellation and update HCP')}
                  className="w-full bg-red-100 text-red-800 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">

      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
         
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'calendar' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('crew')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'crew' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Crew View
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>HCP Synced</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {viewMode === 'calendar' ? <CalendarView /> : <CrewView />}
        </main>
      </div>
      
      {selectedAppointment && <AppointmentDetailPanel />}
    </div>
  );
};

export default CalendarView;
