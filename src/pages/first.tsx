// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { LogOut, Bell, ChevronRight, AlertTriangle } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// interface Animal {
//   id: string;
//   location: string;
//   temperature: number;
//   heartRate: number;
//   age: number;
//   breed: string;
//   gpsLat: number;
//   gpsLng: number;
//   healthHistory: { time: string; temperature: number; heartRate: number; }[];
// }

// const mockAnimals: Animal[] = [
//   {
//     id: 'CTL001',
//     location: 'Pen A',
//     temperature: 38.6,
//     heartRate: 75,
//     age: 3,
//     breed: 'Holstein',
//     gpsLat: 51.5074,
//     gpsLng: -0.1278,
//     healthHistory: Array.from({ length: 24 }, (_, i) => ({
//       time: `${i}:00`,
//       temperature: 38.5 + Math.random() * 0.4,
//       heartRate: 70 + Math.random() * 10
//     }))
//   },
//   {
//     id: 'CTL002',
//     location: 'Pen B',
//     temperature: 39.2,
//     heartRate: 85,
//     age: 2,
//     breed: 'Angus',
//     gpsLat: 51.5075,
//     gpsLng: -0.1279,
//     healthHistory: Array.from({ length: 24 }, (_, i) => ({
//       time: `${i}:00`,
//       temperature: 39.0 + Math.random() * 0.4,
//       heartRate: 80 + Math.random() * 10
//     }))
//   },
//   {
//     id: 'CTL003',
//     location: 'Pen A',
//     temperature: 38.8,
//     heartRate: 72,
//     age: 4,
//     breed: 'Hereford',
//     gpsLat: 51.5076,
//     gpsLng: -0.1280,
//     healthHistory: Array.from({ length: 24 }, (_, i) => ({
//       time: `${i}:00`,
//       temperature: 38.7 + Math.random() * 0.4,
//       heartRate: 70 + Math.random() * 10
//     }))
//   }
// ];

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isMetricCritical = (metric: number, type: 'temperature' | 'heartRate') => {
//     if (type === 'temperature') {
//       return metric > 39.0 || metric < 38.0;
//     }
//     return metric > 80 || metric < 60;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">Cattle Monitor</h1>
//               <div className="ml-8 text-sm text-gray-600">
//                 Welcome, {user?.name} | {user?.role}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <Bell className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-6">
//           {/* Animals Table */}
//           <div className="flex-1 bg-white rounded-lg shadow-sm">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">Monitored Animals</h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Animal ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Location
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Temperature
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Heart Rate
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mockAnimals.map((animal) => (
//                     <tr
//                       key={animal.id}
//                       className="hover:bg-gray-50 cursor-pointer"
//                       onClick={() => setSelectedAnimal(animal)}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {animal.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {animal.location}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={isMetricCritical(animal.temperature, 'temperature') ? 'text-red-600' : 'text-green-600'}>
//                           {animal.temperature}°C
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={isMetricCritical(animal.heartRate, 'heartRate') ? 'text-red-600' : 'text-green-600'}>
//                           {animal.heartRate} BPM
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {(isMetricCritical(animal.temperature, 'temperature') || 
//                           isMetricCritical(animal.heartRate, 'heartRate')) ? (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             <AlertTriangle className="w-3 h-3 mr-1" />
//                             Alert
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             Normal
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button className="text-blue-600 hover:text-blue-800">
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Side Panel */}
//           {selectedAnimal && (
//             <div className="w-96 bg-white rounded-lg shadow-sm">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-semibold text-gray-900">Animal Details</h2>
//                   <button
//                     onClick={() => setSelectedAnimal(null)}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
//                   <dl className="mt-2 space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-sm text-gray-600">ID:</dt>
//                       <dd className="text-sm font-medium text-gray-900">{selectedAnimal.id}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-sm text-gray-600">Age:</dt>
//                       <dd className="text-sm font-medium text-gray-900">{selectedAnimal.age} years</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-sm text-gray-600">Breed:</dt>
//                       <dd className="text-sm font-medium text-gray-900">{selectedAnimal.breed}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-sm text-gray-600">Location:</dt>
//                       <dd className="text-sm font-medium text-gray-900">{selectedAnimal.location}</dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-4">Temperature Trend</h3>
//                   <div className="h-48">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={selectedAnimal.healthHistory}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis domain={[37.5, 39.5]} />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="temperature" stroke="#16a34a" dot={false} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-4">Heart Rate Trend</h3>
//                   <div className="h-48">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={selectedAnimal.healthHistory}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis domain={[50, 100]} />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="heartRate" stroke="#dc2626" dot={false} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;