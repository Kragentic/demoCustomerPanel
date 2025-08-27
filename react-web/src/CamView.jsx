import React, { useState } from "react";
import { 
  Home, MessageCircle, Calendar, DollarSign, Users, 
  Phone, ClipboardList, BookOpen, Settings, BarChart2,
  Search, Filter, Plus, Edit2, Trash2, Copy, 
  CheckCircle, XCircle, AlertTriangle, TestTube
} from "lucide-react";

const CamView = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState('');
  const [abTesting, setAbTesting] = useState({});

  // Mock data for services
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Regular Clean',
      description: 'Standard cleaning for maintaining cleanliness between deep cleans',
      basePrice: 150,
      estimatedHours: 3,
      modifiers: {
        sqft: { rate: 0.05, min: 500, max: 3000 },
        beds: { rate: 15, min: 1, max: 6 },
        baths: { rate: 20, min: 1, max: 4 }
      },
      abTest: null,
      status: 'active'
    },
    {
      id: 2,
      name: 'Deep Clean',
      description: 'Comprehensive cleaning including detailed work in kitchen, bathrooms, and hard-to-reach areas',
      basePrice: 220,
      estimatedHours: 5,
      modifiers: {
        sqft: { rate: 0.08, min: 500, max: 3000 },
        beds: { rate: 25, min: 1, max: 6 },
        baths: { rate: 35, min: 1, max: 4 }
      },
      abTest: null,
      status: 'active'
    },
    {
      id: 3,
      name: 'Move-in/Move-out Clean',
      description: 'Complete cleaning for property turnover, including appliances, windows, and detailed sanitization',
      basePrice: 280,
      estimatedHours: 6,
      modifiers: {
        sqft: { rate: 0.10, min: 500, max: 3000 },
        beds: { rate: 30, min: 1, max: 6 },
        baths: { rate: 40, min: 1, max: 4 }
      },
      abTest: null,
      status: 'active'
    },
    {
      id: 4,
      name: 'Premium Clean',
      description: 'Luxury cleaning with eco-friendly products, organization, and special attention to detail',
      basePrice: 350,
      estimatedHours: 7,
      modifiers: {
        sqft: { rate: 0.12, min: 500, max: 3000 },
        beds: { rate: 40, min: 1, max: 6 },
        baths: { rate: 50, min: 1, max: 4 }
      },
      abTest: null,
      status: 'active'
    }
  ]);

  const handlePriceEdit = (serviceId, currentPrice) => {
    setEditingPrice(serviceId);
    setPriceValue(currentPrice.toString());
  };

  const handlePriceSave = (serviceId) => {
    const updatedServices = services.map(service => 
      service.id === serviceId 
        ? { ...service, basePrice: parseFloat(priceValue) }
        : service
    );
    setServices(updatedServices);
    setEditingPrice(null);
  };

  const toggleAbTest = (serviceId) => {
    setAbTesting(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] ? null : { variantA: 50, variantB: 50, status: 'active' }
    }));
  };

  const updateAbTestSplit = (serviceId, variant, value) => {
    const otherVariant = variant === 'variantA' ? 'variantB' : 'variantA';
    const otherValue = 100 - value;
    
    setAbTesting(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [variant]: value,
        [otherVariant]: otherValue
      }
    }));
  };

  const addService = () => {
    const newService = {
      id: services.length + 1,
      name: 'New Service',
      description: 'Description of the new service',
      basePrice: 100,
      estimatedHours: 2,
      modifiers: {
        sqft: { rate: 0.05, min: 500, max: 3000 },
        beds: { rate: 15, min: 1, max: 6 },
        baths: { rate: 20, min: 1, max: 4 }
      },
      abTest: null,
      status: 'draft'
    };
    setServices([...services, newService]);
  };

  const duplicateService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    const newService = {
      ...service,
      id: Math.max(...services.map(s => s.id)) + 1,
      name: `${service.name} Copy`,
      status: 'draft'
    };
    setServices([...services, newService]);
  };

  const deleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  const calculatePrice = (service) => {
    // Example calculation for a 2000 sqft, 3 bed, 2 bath home
    const sqftCost = (service.modifiers.sqft.rate * (2000 - service.modifiers.sqft.min)) || 0;
    const bedsCost = (service.modifiers.beds.rate * (3 - service.modifiers.beds.min)) || 0;
    const bathsCost = (service.modifiers.baths.rate * (2 - service.modifiers.baths.min)) || 0;
    
    return (service.basePrice + sqftCost + bedsCost + bathsCost).toFixed(2);
  };

  return (
    <div className="flex h-screen bg-gray-50">
    
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
         
            <button
              onClick={addService}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Catalog</h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure your service offerings, pricing, and run A/B tests to optimize conversion
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Est. Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modifiers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      A/B Testing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-150">
                      {/* Service Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                            service.status === 'active' ? 'bg-green-100 text-green-800' :
                            service.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {service.status}
                          </div>
                        </div>
                      </td>
                      
                      {/* Description */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2">{service.description}</div>
                      </td>
                      
                      {/* Base Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingPrice === service.id ? (
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={priceValue}
                              onChange={(e) => setPriceValue(e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                              autoFocus
                            />
                            <button
                              onClick={() => handlePriceSave(service.id)}
                              className="ml-2 text-green-600 hover:text-green-800"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingPrice(null)}
                              className="ml-1 text-red-600 hover:text-red-800"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">${service.basePrice}</span>
                            <button
                              onClick={() => handlePriceEdit(service.id, service.basePrice)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      
                      {/* Estimated Hours */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{service.estimatedHours} hrs</div>
                      </td>
                      
                      {/* Modifiers */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>sqft: ${service.modifiers.sqft.rate}/sqft</div>
                          <div>beds: ${service.modifiers.beds.rate}/bed</div>
                          <div>baths: ${service.modifiers.baths.rate}/bath</div>
                        </div>
                      </td>
                      
                      {/* A/B Testing */}
                      <td className="px-6 py-4">
                        {abTesting[service.id] ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Variant A: {abTesting[service.id].variantA}%</span>
                              <span>Variant B: {abTesting[service.id].variantB}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="range"
                                min="1"
                                max="99"
                                value={abTesting[service.id].variantA}
                                onChange={(e) => updateAbTestSplit(service.id, 'variantA', parseInt(e.target.value))}
                                className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                              />
                              <button
                                onClick={() => toggleAbTest(service.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-xs text-green-600">Testing active</div>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleAbTest(service.id)}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <TestTube className="h-4 w-4 mr-1" />
                            Enable Test
                          </button>
                        )}
                      </td>
                      
                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => duplicateService(service.id)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteService(service.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Calculator Example */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Calculator Example</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Base: ${service.basePrice}</div>
                    <div>+ 2000 sqft: ${(service.modifiers.sqft.rate * (2000 - service.modifiers.sqft.min)).toFixed(2)}</div>
                    <div>+ 3 beds: ${(service.modifiers.beds.rate * (3 - service.modifiers.beds.min)).toFixed(2)}</div>
                    <div>+ 2 baths: ${(service.modifiers.baths.rate * (2 - service.modifiers.baths.min)).toFixed(2)}</div>
                    <div className="border-t pt-2 mt-2">
                      <div className="font-semibold text-gray-900">
                        Total: ${calculatePrice(service)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A/B Testing Explanation */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">A/B Testing Guide</h3>
                <p className="text-blue-800 mb-3">
                  Use A/B testing to experiment with different pricing strategies and see which performs better.
                </p>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Split your traffic between two price points (e.g., $150 vs $160)</li>
                  <li>• Monitor conversion rates and revenue impact</li>
                  <li>• Run tests for at least 2 weeks for statistically significant results</li>
                  <li>• The winning variant will automatically become your new standard price</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CamView;
