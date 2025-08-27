import React, { useState, useEffect } from "react";
import { 
  Home, MessageCircle, Calendar, DollarSign, Users, 
  Phone, ClipboardList, BookOpen, Settings, BarChart2,
  Search, Filter, Plus, ChevronRight, ChevronLeft,
  Play, RotateCcw, Mail, MessageSquare, MapPin, Clock, AlertTriangle
} from "lucide-react";
import CalendarView from "./Calendar";
import CamView from "./CamView";
import CatalogView from "./catalogView";

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock data
  const dashboardStats = [
    { label: 'Inbound Calls', value: '142', delta: '+12%', icon: Phone, color: 'bg-blue-500' },
    { label: 'Outbound Calls', value: '89', delta: '-5%', icon: Phone, color: 'bg-green-500' },
    { label: 'Booked Appointments', value: '67', delta: '+8%', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$12,450', delta: '+15%', icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Rescheduled', value: '12', delta: '+3%', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Cancelled', value: '8', delta: '-2%', icon: ClipboardList, color: 'bg-red-500' },
    { label: 'Sync Errors', value: '3', delta: '-1%', icon: AlertTriangle, color: 'bg-orange-500' }
  ];

  const leadsData = [
    { id: 1, source: 'Yelp', name: 'Sarah Johnson', phone: '(555) 123-4567', zip: '90210', status: 'Qualified', quote: '$180-220', lastInteraction: '2h ago', disposition: 'Needs follow-up' },
    { id: 2, source: 'Google', name: 'Mike Chen', phone: '(555) 234-5678', zip: '90025', status: 'Contacted', quote: '$150-190', lastInteraction: '4h ago', disposition: 'Price sensitive' },
    { id: 3, source: 'Facebook', name: 'Lisa Rodriguez', phone: '(555) 345-6789', zip: '90036', status: 'New', quote: '$200-250', lastInteraction: '1d ago', disposition: 'High potential' },
    { id: 4, source: 'Web', name: 'David Kim', phone: '(555) 456-7890', zip: '90210', status: 'Scheduled', quote: '$175-210', lastInteraction: '30m ago', disposition: 'Appointment set' },
  ];

  const appointmentsData = [
    { id: 1, client: 'Sarah Johnson', date: 'Today, 9:00 AM', service: 'Deep Clean', crew: 'Team A', status: 'confirmed', zip: '90210' },
    { id: 2, client: 'Robert Taylor', date: 'Today, 1:00 PM', service: 'Regular Clean', crew: 'Team B', status: 'confirmed', zip: '90025' },
    { id: 3, client: 'Jennifer Lee', date: 'Tomorrow, 10:00 AM', service: 'Move-in/out Clean', crew: 'Team A', status: 'confirmed', zip: '90036' },
  ];

  const aiAgents = [
    { id: 1, name: 'Alex', avatar: 'A', connectRate: '89%', bookingRate: '34%', avgTime: '4.2 min', personality: 'Friendly & Energetic' },
    { id: 2, name: 'Taylor', avatar: 'T', connectRate: '85%', bookingRate: '38%', avgTime: '3.8 min', personality: 'Professional & Calm' },
    { id: 3, name: 'Jordan', avatar: 'J', connectRate: '92%', bookingRate: '31%', avgTime: '5.1 min', personality: 'Detailed & Thorough' },
    { id: 4, name: 'Casey', avatar: 'C', connectRate: '87%', bookingRate: '41%', avgTime: '3.5 min', personality: 'Quick & Efficient' },
  ];

  const Sidebar = () => (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          {!sidebarCollapsed && <span className="ml-3 text-xl font-bold text-gray-800">CleanPro</span>}
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'leads', label: 'Leads & Conversations', icon: MessageCircle },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'catalog', label: 'Catalog & Pricing', icon: DollarSign },
          // { id: 'scripts', label: 'Scripts & Objections', icon: BookOpen },
          { id: 'agents', label: 'AI Voice Agents', icon: Users },
          { id: 'campaigns', label: 'Campaigns', icon: Mail },
          { id: 'recordings', label: 'Recordings & QA', icon: Play },
          { id: 'settings', label: 'Settings', icon: Settings },
        
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-blue-700' : 'text-gray-400'}`} />
            {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.delta} vs last week
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calls Over Time</h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <BarChart2 className="h-12 w-12 text-blue-400" />
            <span className="ml-2 text-gray-500">Call trend visualization</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
            <DollarSign className="h-12 w-12 text-green-400" />
            <span className="ml-2 text-gray-500">Revenue trend visualization</span>
          </div>
        </div>
      </div>
    </div>
  );

  const LeadsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Leads & Conversations</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            New Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Source', 'Name', 'Phone', 'ZIP', 'Status', 'Quote', 'Last Interaction', 'Disposition'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leadsData.map((lead) => (
                <tr 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.source === 'Yelp' ? 'bg-red-100 text-red-800' :
                      lead.source === 'Google' ? 'bg-blue-100 text-blue-800' :
                      lead.source === 'Facebook' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.zip}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.quote}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastInteraction}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.disposition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
            <option>Day View</option>
            <option>Week View</option>
            <option>Crew View</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            + New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar View</h3>
          <div className="space-y-4">
            {appointmentsData.map((appt) => (
              <div 
                key={appt.id}
                onClick={() => setSelectedAppointment(appt)}
                className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{appt.client}</h4>
                    <p className="text-sm text-gray-600">{appt.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appt.date}</p>
                    <p className="text-xs text-gray-500">{appt.crew}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crew Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crew Utilization</h3>
          <div className="space-y-4">
            {[
              { name: 'Team A', utilization: 85, jobs: 12 },
              { name: 'Team B', utilization: 72, jobs: 9 },
              { name: 'Team C', utilization: 91, jobs: 14 }
            ].map((crew, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{crew.name}</h4>
                  <span className="text-sm font-medium text-gray-600">{crew.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${crew.utilization}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{crew.jobs} jobs this week</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AIAgentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">AI Voice Agents</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          + Create Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {agent.avatar}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.personality}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Connect Rate</div>
                <div className="text-lg font-bold text-blue-700">{agent.connectRate}</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Booking Rate</div>
                <div className="text-lg font-bold text-green-700">{agent.bookingRate}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Avg Time</div>
                <div className="text-lg font-bold text-purple-700">{agent.avgTime}</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                <Play className="h-4 w-4 mr-1" />
                Test Voice
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                <RotateCcw className="h-4 w-4 mr-1" />
                Rotate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  console.log("activeTab--->",activeTab)
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsTab />;
      case 'appointments':
        return <AppointmentsTab/>;
      case 'catalog':
        return <CamView/>;
        
       case 'campaigns':
        return <CatalogView/>;  
     
      case 'agents':
        return <AIAgentsTab />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Feature Coming Soon</h3>
              <p className="text-gray-500 mt-1">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  const LeadDetailPanel = () => (
    selectedLead && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
        <div className="bg-white w-96 h-full shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedLead.name}</h3>
                <p className="text-gray-600">{selectedLead.phone}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Lead Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span className="font-medium">{selectedLead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ZIP Code:</span>
                  <span className="font-medium">{selectedLead.zip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{selectedLead.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quote Range:</span>
                  <span className="font-medium">{selectedLead.quote}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Conversation History</h4>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="text-gray-700">AI: Hi Sarah, this is CleanPro calling about your cleaning service inquiry...</p>
                <p className="text-gray-700 mt-2">Sarah: Yes, I'm interested in getting a deep clean for my 3-bedroom home...</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">AI Summary</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Potential customer interested in deep cleaning for 3-bedroom home. Price sensitive but open to premium service. Best time to call back: 6-8 PM.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </button>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Text Now
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'leads' && 'Leads & Conversations'}
                {activeTab === 'appointments' && 'Appointments'}
                {activeTab === 'agents' && 'AI Voice Agents'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === 'dashboard' && 'Overview of your cleaning service operations'}
                {activeTab === 'leads' && 'Manage all your leads and conversations'}
                {activeTab === 'appointments' && 'Schedule and manage cleaning appointments'}
                {activeTab === 'agents' && 'Monitor and manage your AI voice agents'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      
      {selectedLead && <LeadDetailPanel />}
    </div>
  );
};

export default App;
