
export default function PointsHistory({ data, isLoading }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
// UI updated

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">📜 Claim History</h2>
  
  {isLoading ? (
    <div className="text-center py-6 text-gray-400">Loading...</div>
  ) : (
    <div className="overflow-y-auto max-h-96 rounded-xl">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} className="border-b">
              <td className="px-4 py-2">{entry.user}</td>
              <td className="px-4 py-2 text-green-600 font-bold">+{entry.pointsClaimed}</td>
              <td className="px-4 py-2 text-gray-500">{formatDate(entry.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}