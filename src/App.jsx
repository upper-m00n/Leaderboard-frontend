import { useState, useEffect } from 'react';
import axios from 'axios';
import UserActions from './components/UserActions';
import Leaderboard from './components/Leaderboard';
import PointsHistory from './components/PointsHistory';
import Layout from './components/Layout';

function App() {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const API_URL = 'https://leaderboard-backend-fjld.onrender.com/api';
  // fetches users
  const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setUsers(response.data);
  };
// fetches leaderboard
  const fetchLeaderboard = async () => {
    const response = await axios.get(`${API_URL}/leaderboard`);
    //console.log()
    setLeaderboard(response.data);
  };

  const fetchHistory = async () => {
    const response = await axios.get(`${API_URL}/history`);
    setHistory(response.data);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchUsers(), fetchLeaderboard(), fetchHistory()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

// handling point system
  const handleClaimSuccess = (response) => {
    setLeaderboard(prev => {
      const updated = prev.map(user => 
        user._id === response.data.user.id
          ? { ...user, totalPoints: response.data.user.totalPoints }
          : user
      );
      return updated.sort((a, b) => b.totalPoints - a.totalPoints);
    });

    setHistory(prev => [{
      id: Date.now().toString(),
      user: response.data.user.name,
      pointsClaimed: response.data.pointsAwarded,
      timestamp: new Date().toISOString()
    }, ...prev]);

    fetchData();
  };

  return (
    <Layout notification={notification}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserActions 
          users={users} 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fetchData={fetchData}
          showNotification={showNotification}
          setUsers={setUsers} 
          setLeaderboard={setLeaderboard}
          setHistory={setHistory}
          onClaimSuccess={handleClaimSuccess}
        />
        
        <Leaderboard 
          data={leaderboard} 
          isLoading={isLoading}
        />
        
        <PointsHistory 
          data={history} 
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}

export default App;