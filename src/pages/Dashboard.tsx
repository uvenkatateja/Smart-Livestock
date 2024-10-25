import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, ChevronRight, AlertTriangle, Trash } from 'lucide-react'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface Animal {
  id: string;
  location: string;
  temperature: number;
  heartRate: number;
  age: number;
  breed: string;
  gpsLat: number;
  gpsLng: number;
  healthHistory: { time: string; temperature: number; heartRate: number; }[];
}

const mockAnimals: Animal[] = [
  {
    id: 'CTL001',
    location: 'Pen A',
    temperature: 38.6,
    heartRate: 75,
    age: 3,
    breed: 'Holstein',
    gpsLat: 51.5074,
    gpsLng: -0.1278,
    healthHistory: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: 38.5 + Math.random() * 0.4,
      heartRate: 70 + Math.random() * 10
    }))
  },
  {
    id: 'CTL002',
    location: 'Pen B',
    temperature: 39.2,
    heartRate: 85,
    age: 2,
    breed: 'Angus',
    gpsLat: 51.5075,
    gpsLng: -0.1279,
    healthHistory: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: 39.0 + Math.random() * 0.4,
      heartRate: 80 + Math.random() * 10
    }))
  },
  {
    id: 'CTL003',
    location: 'Pen A',
    temperature: 38.8,
    heartRate: 72,
    age: 4,
    breed: 'Hereford',
    gpsLat: 51.5076,
    gpsLng: -0.1280,
    healthHistory: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: 38.7 + Math.random() * 0.4,
      heartRate: 70 + Math.random() * 10
    }))
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [newAnimal, setNewAnimal] = useState<Partial<Animal>>({
    id: '',
    location: '',
    temperature: 0,
    heartRate: 0,
    age: 0,
    breed: '',
    gpsLat: 0,
    gpsLng: 0,
    healthHistory: []
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isMetricCritical = (metric: number, type: 'temperature' | 'heartRate') => {
    if (type === 'temperature') {
      return metric > 39.0 || metric < 38.0;
    }
    return metric > 80 || metric < 60;
  };

  const handleAddAnimal = (e: React.FormEvent) => {
    e.preventDefault();

    const newAnimalData = {
      ...newAnimal,
      healthHistory: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        temperature: newAnimal.temperature as number,
        heartRate: newAnimal.heartRate as number
      }))
    };

    mockAnimals.push({
      id: newAnimal.id as string,
      location: newAnimal.location as string,
      temperature: newAnimal.temperature as number,
      heartRate: newAnimal.heartRate as number,
      age: newAnimal.age as number,
      breed: newAnimal.breed as string,
      gpsLat: newAnimal.gpsLat as number,
      gpsLng: newAnimal.gpsLng as number,
      healthHistory: newAnimalData.healthHistory
    });
    
    setNewAnimal({
      id: '',
      location: '',
      temperature: 0,
      heartRate: 0,
      age: 0,
      breed: '',
      gpsLat: 0,
      gpsLng: 0,
      healthHistory: []
    });
  };

  const handleDeleteAnimal = (animalId: string) => {
    const updatedAnimals = mockAnimals.filter(animal => animal.id !== animalId);
    mockAnimals.length = 0; 
    mockAnimals.push(...updatedAnimals);
    setSelectedAnimal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Cattle Monitor</h1>
              <div className="ml-8 text-sm text-gray-600">
                Welcome, {user?.name} | {user?.role}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Animals Table */}
          <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Monitored Animals</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Animal ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temperature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Heart Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAnimals.map((animal) => (
                    <tr
                      key={animal.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {animal.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {animal.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isMetricCritical(animal.temperature, 'temperature') ? 'text-red-600' : 'text-green-600'}>
                          {animal.temperature}°C
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isMetricCritical(animal.heartRate, 'heartRate') ? 'text-red-600' : 'text-green-600'}>
                          {animal.heartRate} BPM
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(isMetricCritical(animal.temperature, 'temperature') || isMetricCritical(animal.heartRate, 'heartRate')) && (
                          <span className="text-red-600 font-semibold">
                            Alert!
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleDeleteAnimal(animal.id)} className="text-red-600 hover:text-red-900">
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Animal Details */}
          {selectedAnimal && (
            <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Animal Details</h2>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-md font-semibold">General Information</h3>
                  <p>ID: {selectedAnimal.id}</p>
                  <p>Location: {selectedAnimal.location}</p>
                  <p>Age: {selectedAnimal.age} years</p>
                  <p>Breed: {selectedAnimal.breed}</p>
                  <div className="text-sm text-gray-600">
                    <p>GPS: {selectedAnimal.gpsLat}, {selectedAnimal.gpsLng}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold">Health Metrics</h3>
                  <p>
                    Temperature: <span className={isMetricCritical(selectedAnimal.temperature, 'temperature') ? 'text-red-600' : 'text-green-600'}>
                      {selectedAnimal.temperature}°C
                    </span>
                  </p>
                  <p>
                    Heart Rate: <span className={isMetricCritical(selectedAnimal.heartRate, 'heartRate') ? 'text-red-600' : 'text-green-600'}>
                      {selectedAnimal.heartRate} BPM
                    </span>
                  </p>
                </div>

                {/* Health History Chart */}
                <h3 className="text-md font-semibold">Health History</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedAnimal.healthHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Animal Form */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900">Add New Animal</h2>
          <form onSubmit={handleAddAnimal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Animal ID"
                value={newAnimal.id}
                onChange={(e) => setNewAnimal({ ...newAnimal, id: e.target.value })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newAnimal.location}
                onChange={(e) => setNewAnimal({ ...newAnimal, location: e.target.value })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Temperature (°C)"
                value={newAnimal.temperature}
                onChange={(e) => setNewAnimal({ ...newAnimal, temperature: parseFloat(e.target.value) })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Heart Rate (BPM)"
                value={newAnimal.heartRate}
                onChange={(e) => setNewAnimal({ ...newAnimal, heartRate: parseFloat(e.target.value) })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Age (years)"
                value={newAnimal.age}
                onChange={(e) => setNewAnimal({ ...newAnimal, age: parseInt(e.target.value) })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Breed"
                value={newAnimal.breed}
                onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="GPS Latitude"
                value={newAnimal.gpsLat}
                onChange={(e) => setNewAnimal({ ...newAnimal, gpsLat: parseFloat(e.target.value) })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="GPS Longitude"
                value={newAnimal.gpsLng}
                onChange={(e) => setNewAnimal({ ...newAnimal, gpsLng: parseFloat(e.target.value) })}
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <button type="submit" className="mt-4 w-min bg-blue-600 text-white font-bold py-2 px-2 rounded-md">
              Add Animal
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
