import React, { useState, useEffect } from "react";
import { 
  Home, MessageCircle, Calendar, DollarSign, Users, 
  Phone, ClipboardList, BookOpen, Settings, BarChart2,
  Search, Filter, Plus, Edit2, Trash2, Copy, 
  CheckCircle, XCircle, Send, Mail, MessageSquare,
  Eye, Clock, TrendingUp, Target, Users as UsersIcon,
  List, RefreshCw, AlertCircle
} from "lucide-react";

const CatalogView = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [subTab, setSubTab] = useState('email');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [editorContent, setEditorContent] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  // Mock data for email campaigns
  const [emailCampaigns, setEmailCampaigns] = useState([
    {
      id: 1,
      name: 'Spring Cleaning Special',
      subject: 'Get 20% Off Your Spring Deep Clean!',
      status: 'sent',
      sentDate: '2024-01-10',
      audience: 'Past Customers',
      stats: {
        sent: 1250,
        delivered: 1220,
        openRate: 42,
        clickRate: 18,
        conversions: 45
      },
      template: `<h2 style="color: #4F46E5;">Spring Cleaning Special</h2>
<p>It's time to refresh your home! Get 20% off our premium deep cleaning service this spring.</p>
<p>Our professional team will make your home sparkle with eco-friendly products.</p>
<a href="#" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Book Now & Save</a>
<p>Offer valid through May 31st.</p>`
    },
    {
      id: 2,
      name: 'New Customer Welcome',
      subject: 'Welcome to CleanPro - First Clean 15% Off!',
      status: 'sent',
      sentDate: '2024-01-05',
      audience: 'New Leads',
      stats: {
        sent: 890,
        delivered: 875,
        openRate: 58,
        clickRate: 24,
        conversions: 32
      },
      template: `<h2 style="color: #4F46E5;">Welcome to CleanPro!</h2>
<p>Thank you for considering our cleaning services. As a welcome gift, get 15% off your first cleaning.</p>
<p>Our trusted professionals are background checked and fully insured.</p>
<a href="#" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Claim Your Discount</a>`
    },
    {
      id: 3,
      name: 'Referral Program',
      subject: 'Refer a Friend, Get $50!',
      status: 'scheduled',
      sentDate: '2024-01-15',
      audience: 'Loyal Customers',
      stats: {
        sent: 0,
        delivered: 0,
        openRate: 0,
        clickRate: 0,
        conversions: 0
      },
      template: `<h2 style="color: #4F46E5;">Share the CleanPro Love!</h2>
<p>Love our service? Refer a friend and you'll both get $50 off your next cleaning!</p>
<p>There's no limit to how many friends you can refer.</p>
<a href="#" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Refer Now</a>`
    }
  ]);

  // Mock data for SMS campaigns
  const [smsCampaigns, setSmsCampaigns] = useState([
    {
      id: 1,
      name: 'Last Minute Booking',
      message: 'Hi {name}, we have last-minute availability this week! Get 15% off a deep clean. Reply YES to claim or STOP to opt out.',
      status: 'sent',
      sentDate: '2024-01-12',
      audience: 'Interested Leads',
      stats: {
        sent: 320,
        delivered: 310,
        responseRate: 22,
        conversions: 18
      }
    },
    {
      id: 2,
      name: 'Follow Up After Service',
      message: 'Hi {name}, hope you loved your cleaning! How would you rate your experience? Reply 1-5. Get 10% off your next service when you refer a friend!',
      status: 'sent',
      sentDate: '2024-01-08',
      audience: 'Recent Customers',
      stats: {
        sent: 450,
        delivered: 445,
        responseRate: 38,
        conversions: 25
      }
    },
    {
      id: 3,
      name: 'Seasonal Promotion',
      message: 'Spring Special! 20% off deep cleans this month. Limited availability. Book now: [link]',
      status: 'draft',
      sentDate: null,
      audience: 'Past Customers',
      stats: {
        sent: 0,
        delivered: 0,
        responseRate: 0,
        conversions: 0
      }
    }
  ]);

  // Mock data for audiences
  const audiences = [
    { id: 1, name: 'All Leads', count: 2140 },
    { id: 2, name: 'New Leads', count: 890 },
    { id: 3, name: 'Past Customers', count: 1250 },
    { id: 4, name: 'Loyal Customers', count: 420 },
    { id: 5, name: 'Interested Leads', count: 320 },
    { id: 6, name: 'Recent Customers', count: 450 },
    { id: 7, name: 'High Value Clients', count: 180 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const EmailCampaigns = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Campaigns</h2>
          <p className="text-sm text-gray-600 mt-1">Create and manage email marketing campaigns via Mautic integration</p>
        </div>
        <button
          onClick={() => {
            setIsComposing(true);
            setCampaignName('');
            setSubject('');
            setEditorContent('');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Campaign
        </button>
      </div>

      {/* Compose Email Modal */}
      {isComposing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Create Email Campaign</h3>
                <button 
                  onClick={() => setIsComposing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Spring Cleaning Special"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Get 20% Off Your Spring Deep Clean!"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {audiences.map(audience => (
                    <option key={audience.id} value={audience.id}>
                      {audience.name} ({audience.count} contacts)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-900 text-sm">B</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">I</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">U</button>
                    <div className="border-l border-gray-300 mx-2"></div>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">Link</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">Image</button>
                  </div>
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Start writing your email content..."
                    className="w-full h-64 p-4 focus:outline-none resize-none"
                    style={{ lineHeight: '1.6' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save campaign logic here
                  setIsComposing(false);
                  setCampaignName('');
                  setSubject('');
                  setEditorContent('');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Send className="h-4 w-4 mr-1" />
                Schedule Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Past & Scheduled Campaigns</h3>
              <p className="text-sm text-gray-600 mt-1">Track performance and manage your email campaigns</p>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Audiences</option>
                {audiences.map(audience => (
                  <option key={audience.id} value={audience.name}>{audience.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emailCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-600">{campaign.subject}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{campaign.audience}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString() : 'Not sent'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Eye className="h-3 w-3 text-gray-400 mr-1" />
                        <span>{campaign.stats.openRate}% open rate</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="h-3 w-3 text-gray-400 mr-1" />
                        <span>{campaign.stats.clickRate}% click rate</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {campaign.stats.conversions} conversions
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setCampaignName(campaign.name);
                          setSubject(campaign.subject);
                          setEditorContent(campaign.template);
                          setIsComposing(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{emailCampaigns.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(emailCampaigns.reduce((acc, c) => acc + c.stats.openRate, 0) / emailCampaigns.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCampaigns.reduce((acc, c) => acc + c.stats.conversions, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SMSCampaigns = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SMS Campaigns</h2>
          <p className="text-sm text-gray-600 mt-1">Send targeted text messages to your customers and leads</p>
        </div>
        <button
          onClick={() => {
            setIsComposing(true);
            setCampaignName('');
            setEditorContent('');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          New SMS Campaign
        </button>
      </div>

      {/* Compose SMS Modal */}
      {isComposing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Create SMS Campaign</h3>
                <button 
                  onClick={() => setIsComposing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Last Minute Booking"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {audiences.map(audience => (
                    <option key={audience.id} value={audience.id}>
                      {audience.name} ({audience.count} contacts)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  placeholder="Write your SMS message (max 160 characters)..."
                  className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none resize-none"
                  maxLength={160}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{editorContent.length}/160 characters</span>
                  <span className="text-xs text-gray-500">1 message</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                    <p className="text-xs text-yellow-700">
                      Include opt-out instructions (e.g., "Reply STOP to unsubscribe") to comply with regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save campaign logic here
                  setIsComposing(false);
                  setCampaignName('');
                  setEditorContent('');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Send className="h-4 w-4 mr-1" />
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMS Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">SMS Campaigns</h3>
              <p className="text-sm text-gray-600 mt-1">Track performance of your text message campaigns</p>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Audiences</option>
                {audiences.map(audience => (
                  <option key={audience.id} value={audience.name}>{audience.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {smsCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {campaign.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{campaign.audience}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString() : 'Not sent'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                        <span>{campaign.stats.responseRate}% response rate</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {campaign.stats.conversions} conversions
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setCampaignName(campaign.name);
                          setEditorContent(campaign.message);
                          setIsComposing(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMS Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total SMS Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{smsCampaigns.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg. Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(smsCampaigns.reduce((acc, c) => acc + c.stats.responseRate, 0) / smsCampaigns.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {smsCampaigns.reduce((acc, c) => acc + c.stats.conversions, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CampaignDetailPanel = () => (
    selectedCampaign && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
        <div className="bg-white w-96 h-full shadow-xl overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedCampaign.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {subTab === 'email' ? selectedCampaign.subject : selectedCampaign.message}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)}
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
              <h4 className="font-medium text-gray-900 mb-3">Campaign Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Audience:</span>
                  <span className="font-medium">{selectedCampaign.audience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sent Date:</span>
                  <span className="font-medium">
                    {selectedCampaign.sentDate ? new Date(selectedCampaign.sentDate).toLocaleDateString() : 'Not sent'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">
                    {subTab === 'email' ? selectedCampaign.stats.sent : selectedCampaign.stats.sent}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                {subTab === 'email' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Open Rate</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{selectedCampaign.stats.openRate}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedCampaign.stats.openRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Click Rate</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{selectedCampaign.stats.clickRate}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${selectedCampaign.stats.clickRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{selectedCampaign.stats.responseRate}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${selectedCampaign.stats.responseRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversions</span>
                  <span className="text-sm font-medium text-gray-900">{selectedCampaign.stats.conversions}</span>
                </div>
              </div>
            </div>
            
            {subTab === 'email' && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Email Preview</h4>
                <div 
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                  dangerouslySetInnerHTML={{ __html: selectedCampaign.template }}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Duplicate Campaign
              </button>
              {selectedCampaign.status === 'draft' && (
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Send Now
                </button>
              )}
              {selectedCampaign.status === 'sent' && (
                <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  Create Similar Campaign
                </button>
              )}
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
           
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSubTab('email')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  subTab === 'email' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setSubTab('sms')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  subTab === 'sms' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                SMS
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {subTab === 'email' ? <EmailCampaigns /> : <SMSCampaigns />}
        </main>
      </div>
      
      {selectedCampaign && <CampaignDetailPanel />}
    </div>
  );
};

export default CatalogView;
