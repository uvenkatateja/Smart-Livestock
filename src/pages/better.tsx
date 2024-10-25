
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { LogOut, Bell, ChevronRight, AlertTriangle, Trash } from 'lucide-react'; // Added Trash icon
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
//   const [newAnimal, setNewAnimal] = useState<Partial<Animal>>({
//     id: '',
//     location: '',
//     temperature: 0,
//     heartRate: 0,
//     age: 0,
//     breed: '',
//     gpsLat: 0,
//     gpsLng: 0,
//     healthHistory: []
//   });

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

//   const handleAddAnimal = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newAnimalData = {
//       ...newAnimal,
//       healthHistory: Array.from({ length: 24 }, (_, i) => ({
//         time: `${i}:00`,
//         temperature: newAnimal.temperature as number,
//         heartRate: newAnimal.heartRate as number
//       }))
//     };

//     // Add the new animal to the mockAnimals array
//     mockAnimals.push({
//       id: newAnimal.id as string,
//       location: newAnimal.location as string,
//       temperature: newAnimal.temperature as number,
//       heartRate: newAnimal.heartRate as number,
//       age: newAnimal.age as number,
//       breed: newAnimal.breed as string,
//       gpsLat: newAnimal.gpsLat as number,
//       gpsLng: newAnimal.gpsLng as number,
//       healthHistory: newAnimalData.healthHistory
//     });
    
//     // Reset the new animal state
//     setNewAnimal({
//       id: '',
//       location: '',
//       temperature: 0,
//       heartRate: 0,
//       age: 0,
//       breed: '',
//       gpsLat: 0,
//       gpsLng: 0,
//       healthHistory: []
//     });
//   };

//   const handleDeleteAnimal = (animalId: string) => {
//     const updatedAnimals = mockAnimals.filter(animal => animal.id !== animalId);
//     mockAnimals.length = 0; // Clear the existing array
//     mockAnimals.push(...updatedAnimals); // Add the updated animals back
//     setSelectedAnimal(null); // Reset selected animal if deleted
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
//         <div className="flex gap-6 flex-wrap">
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
//                         {(isMetricCritical(animal.temperature, 'temperature') || isMetricCritical(animal.heartRate, 'heartRate')) && (
//                           <span className="text-red-600">
//                             <AlertTriangle className="inline h-4 w-4 mr-1" />
//                             Alert
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteAnimal(animal.id);
//                           }}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <Trash className="inline h-5 w-5" /> {/* Replace button with icon */}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Animal Details */}
//           <div className="flex-1 bg-white rounded-lg shadow-sm">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">Animal Details</h2>
//             </div>
//             {selectedAnimal ? (
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900">{selectedAnimal.breed} (ID: {selectedAnimal.id})</h3>
//                 <p className="mt-2 text-gray-700">Location: {selectedAnimal.location}</p>
//                 <p className="mt-2 text-gray-700">Age: {selectedAnimal.age} years</p>
//                 <p className="mt-2 text-gray-700">Temperature: {selectedAnimal.temperature}°C</p>
//                 <p className="mt-2 text-gray-700">Heart Rate: {selectedAnimal.heartRate} BPM</p>
//                 <div className="mt-4 h-64">
//                   <ResponsiveContainer>
//                     <LineChart data={selectedAnimal.healthHistory}>
//                       <XAxis dataKey="time" />
//                       <YAxis />
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
//                       <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-6 text-gray-500">Select an animal to see details</div>
//             )}
//           </div>
//         </div>

//         {/* Add Animal Form */}
//         <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
//           <h2 className="text-lg font-semibold text-gray-900">Add New Animal</h2>
//           <form onSubmit={handleAddAnimal} className="mt-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Animal ID"
//                 value={newAnimal.id}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, id: e.target.value })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={newAnimal.location}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, location: e.target.value })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Temperature"
//                 value={newAnimal.temperature}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, temperature: Number(e.target.value) })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Heart Rate"
//                 value={newAnimal.heartRate}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, heartRate: Number(e.target.value) })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Age"
//                 value={newAnimal.age}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, age: Number(e.target.value) })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Breed"
//                 value={newAnimal.breed}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="GPS Latitude"
//                 value={newAnimal.gpsLat}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, gpsLat: Number(e.target.value) })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="GPS Longitude"
//                 value={newAnimal.gpsLng}
//                 onChange={(e) => setNewAnimal({ ...newAnimal, gpsLng: Number(e.target.value) })}
//                 className="border border-gray-300 rounded-md p-2"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Add Animal
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
