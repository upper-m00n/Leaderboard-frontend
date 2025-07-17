import { useState } from 'react';
import axios from 'axios';

export default function UserActions({ 
  users, 
  isLoading, 
  setIsLoading, 
  fetchData, 
  showNotification,
  setUsers,
  setLeaderboard,
  setHistory,
  onClaimSuccess
}) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');

  const API_URL = 'https://leaderboard-backend-production-e458.up.railway.app';

  // handles point and calls api
  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      showNotification('Please select a user first', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(`${API_URL}/api/claim/${selectedUserId}`);
      
      showNotification(
        `${response.data.user.name} gained ${response.data.pointsAwarded} points!`,
        'success'
      );
      
      onClaimSuccess(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to claim points';
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      showNotification('Please enter a name', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/users`, { 
        name: newUserName 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setNewUserName('');
      showNotification('User added successfully');
      
      // for real time update
      setUsers(prevUsers => [...prevUsers, response.data]);
      
      // Refresh all data 
      await fetchData();
    } catch (error) {
      console.error('Add user error:', error);
      const errorMessage = error.response?.data?.message || 'Error adding user';
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">⚙️ User Actions</h2>

  <label className="block text-sm font-medium text-gray-700 mb-1">Select User:</label>
  <select
    value={selectedUserId}
    onChange={(e) => setSelectedUserId(e.target.value)}
    disabled={isLoading}
    className="w-full p-2 rounded-xl border border-gray-300 mb-4"
  >
    <option value="">-- Select a user --</option>
    {users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.name}
      </option>
    ))}
  </select>

  <button
    onClick={handleClaimPoints}
    disabled={!selectedUserId || isLoading}
    className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition mb-6"
  >
    {isLoading ? 'Processing...' : 'Claim Points'}
  </button>

  <form onSubmit={handleAddUser}>
    <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">➕ Add New User</h3>
    <div className="flex gap-2">
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter user name"
        className="flex-1 p-2 rounded-xl border border-gray-300"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
      >
        Add
      </button>
    </div>
  </form>
</div>

  );
}