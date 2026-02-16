import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, EyeOff } from 'lucide-react';

const Moderation = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [posts] = useState([
    {
      id: 'post-1',
      author: 'John Doe',
      authorId: 'user-123',
      content: 'This is a sample post that needs moderation...',
      media: null,
      timestamp: '2024-06-10T14:23:00Z',
      status: 'pending',
      reports: 0,
      engagement: { likes: 5, comments: 2 },
    },
    {
      id: 'post-2',
      author: 'Jane Smith',
      authorId: 'user-456',
      content: 'Another post that has been flagged for review...',
      media: null,
      timestamp: '2024-06-10T12:15:00Z',
      status: 'flagged',
      reports: 3,
      engagement: { likes: 12, comments: 4 },
    },
    // Add more mock posts as needed
  ]);

  const tabs = [
    { id: 'new', label: 'New Posts', count: posts.filter(p => p.status === 'pending').length },
    { id: 'flagged', label: 'Flagged Posts', count: posts.filter(p => p.status === 'flagged').length },
    { id: 'removed', label: 'Removed Posts', count: posts.filter(p => p.status === 'removed').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
        <div className="flex space-x-3">
          <button className="btn-outline">Refresh</button>
          <button className="btn-primary">Bulk Actions</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 py-0.5 px-2 bg-gray-100 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button className="btn-outline flex items-center">
          <Filter size={18} className="mr-2" />
          Filter
        </button>
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most-reported">Most Reported</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm font-medium">
                    {post.author.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {post.status === 'flagged' && (
                    <span className="ml-4 badge-warning">Flagged ({post.reports} reports)</span>
                  )}
                </div>

                <p className="text-gray-800 mb-3">{post.content}</p>

                {post.media && (
                  <div className="bg-gray-100 h-32 w-32 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-gray-500">Media Preview</span>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>❤️ {post.engagement.likes} likes</span>
                  <span>💬 {post.engagement.comments} comments</span>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button
                  className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye size={18} className="text-green-600" />
                </button>
                <button
                  className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  title="Approve"
                >
                  <CheckCircle size={18} className="text-green-600" />
                </button>
                <button
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Remove"
                >
                  <XCircle size={18} className="text-red-600" />
                </button>
                <button
                  className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                  title="Shadow Ban"
                >
                  <EyeOff size={18} className="text-yellow-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moderation;