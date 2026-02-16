import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Download, Calendar, Users, FileText, Flag, TrendingUp } from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock data
  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 800 },
    { month: 'Feb', users: 1350, active: 920 },
    { month: 'Mar', users: 1500, active: 1100 },
    { month: 'Apr', users: 1680, active: 1250 },
    { month: 'May', users: 1820, active: 1400 },
    { month: 'Jun', users: 1950, active: 1550 },
  ];

  const engagementData = [
    { name: 'Posts', value: 450 },
    { name: 'Events', value: 120 },
    { name: 'Comments', value: 890 },
    { name: 'Likes', value: 2340 },
  ];

  const reportData = [
    { category: 'Spam', count: 45 },
    { category: 'Harassment', count: 32 },
    { category: 'Inappropriate', count: 28 },
    { category: 'False Info', count: 19 },
    { category: 'Other', count: 15 },
  ];

  const COLORS = ['#5c2e8a', '#b48fda', '#52297c', '#8a5fb3', '#a57cc0'];

  const kpiData = [
    {
      title: 'Total Users',
      value: '19,850',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Active Users',
      value: '12,340',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Posts',
      value: '45,230',
      change: '+15.3%',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Reports',
      value: '234',
      change: '-5.1%',
      icon: Flag,
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button className="btn-outline flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm mt-2 ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change} vs previous period
                </p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">User Growth & Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#5c2e8a" fill="#5c2e8a" fillOpacity={0.3} />
                <Area type="monotone" dataKey="active" stackId="2" stroke="#b48fda" fill="#b48fda" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Distribution */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Content Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Categories */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Reports by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#5c2e8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics Table */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Key Metrics Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Average Session Duration</span>
              <span className="font-semibold">12m 30s</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="font-semibold">42.3%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">User Retention (30d)</span>
              <span className="font-semibold">78.5%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Avg. Posts per User</span>
              <span className="font-semibold">2.3</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">KYC Completion Rate</span>
              <span className="font-semibold">64.8%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Event Attendance Rate</span>
              <span className="font-semibold">43.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Export Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-outline flex items-center justify-center">
            <Download size={18} className="mr-2" />
            User Data (CSV)
          </button>
          <button className="btn-outline flex items-center justify-center">
            <Download size={18} className="mr-2" />
            Engagement Data (CSV)
          </button>
          <button className="btn-outline flex items-center justify-center">
            <Download size={18} className="mr-2" />
            Report Data (CSV)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;