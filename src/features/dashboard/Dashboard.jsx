import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Clock,
  Flag,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { mockDashboardData } from '../../utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load mock data
    setData(mockDashboardData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Users',
      value: data.totalUsers,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      link: '/users',
    },
    {
      title: 'Active Users (24h)',
      value: data.activeUsers,
      change: '+5%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
      link: '/users',
    },
    {
      title: 'Pending KYC',
      value: data.pendingKYC,
      change: '+3',
      trend: 'up',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/kyc',
    },
    {
      title: 'Reported Content',
      value: data.reportedContent,
      change: '-2',
      trend: 'down',
      icon: Flag,
      color: 'bg-red-100 text-red-600',
      link: '/reports',
    },
    {
      title: 'Pending Events',
      value: data.pendingEvents,
      change: '+8',
      trend: 'up',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      link: '/events',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.link)}
            className="stat-card cursor-pointer transform transition-all hover:scale-105"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                  <span
                    className={`text-sm ml-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#5c2e8a"
                  fill="#b48fda"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Posts vs Moderation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.postsModeration}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#5c2e8a" />
                <Bar dataKey="moderated" fill="#b48fda" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Alerts & Flags</h2>
        <div className="space-y-3">
          {data.alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high'
                  ? 'border-red-500 bg-red-50'
                  : alert.severity === 'medium'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    alert.severity === 'high'
                      ? 'bg-red-200 text-red-800'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}
                >
                  {alert.severity.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;