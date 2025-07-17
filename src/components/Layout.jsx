
export default function Layout({ children, notification }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          My leaderboard App
        </h1>
        
        {notification && (
          <div className={`mb-4 p-3 rounded-md ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {notification.message}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}