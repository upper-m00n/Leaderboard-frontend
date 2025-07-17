// src/components/Leaderboard.jsx
import { Crown } from 'lucide-react';

const crownColors = ['text-yellow-500', 'text-gray-400', 'text-yellow-700'];

export default function Leaderboard({ data, isLoading }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-100">
      <h2 className="text-2xl font-semibold text-yellow-600 mb-4 text-center">🏆 Top Scorers</h2>

      {isLoading ? (
        <div className="text-center py-6 text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {data.map((user, index) => (
            <div
              key={user._id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${
                index === 0 ? 'bg-yellow-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500 uppercase">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500">Rank #{user.rank}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {index < 3 && <Crown size={20} className={crownColors[index]} />}
                <span className="font-bold text-yellow-600">{user.totalPoints} pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}