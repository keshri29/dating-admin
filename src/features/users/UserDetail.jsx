import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Clock,
  Flag,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  Ban,
  UserCheck,
} from 'lucide-react';
import { format } from 'date-fns';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  useEffect(() => {
    // Mock user data
    setUser({
      id,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8901',
      status: 'active',
      kycStatus: 'verified',
      signupDate: '2024-01-15T10:30:00Z',
      lastActive: '2024-06-10T14:23:00Z',
      profilePhoto: null,
      kycDocuments: {
        idDocument: 'https://example.com/id.jpg',
        selfie: 'https://example.com/selfie.jpg',
      },
      activityHistory: [
        { action: 'Login', timestamp: '2024-06-10T14:23:00Z', ip: '192.168.1.1' },
        { action: 'Created post', timestamp: '2024-06-09T09:15:00Z', details: 'Post ID: post-123' },
        { action: 'Login', timestamp: '2024-06-08T11:30:00Z', ip: '192.168.1.1' },
      ],
      reports: [
        { id: 'report-1', reason: 'Spam', date: '2024-06-05T10:00:00Z', status: 'pending' },
      ],
    });
  }, [id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/users')}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Users
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="col-span-2 card">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-white text-2xl font-medium">
                {user.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">User ID: {user.id}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`badge-${user.status === 'active' ? 'success' : 'warning'}`}>
                    {user.status}
                  </span>
                  <span className={`badge-${user.kycStatus === 'verified' ? 'success' : 'warning'}`}>
                    KYC: {user.kycStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSuspendModal(true)}
                className="btn-outline flex items-center"
              >
                <Ban size={18} className="mr-2" />
                Suspend
              </button>
              <button
                onClick={() => setShowBanModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <AlertTriangle size={18} className="mr-2" />
                Ban
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              {user.email}
            </div>
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              {user.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              Joined: {format(new Date(user.signupDate), 'MMM dd, yyyy')}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              Last active: {format(new Date(user.lastActive), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
        </div>

        {/* KYC Status Card */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            KYC Documents
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">ID Document</p>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Document Preview</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Selfie</p>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Selfie Preview</span>
              </div>
            </div>
            <button className="btn-primary w-full">Verify KYC</button>
          </div>
        </div>

        {/* Activity History */}
        <div className="col-span-2 card">
          <h2 className="text-lg font-semibold mb-4">Activity History</h2>
          <div className="space-y-3">
            {user.activityHistory.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.details || activity.ip}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Flag className="mr-2" size={20} />
            Reports
          </h2>
          {user.reports.length > 0 ? (
            <div className="space-y-3">
              {user.reports.map((report) => (
                <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{report.reason}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {format(new Date(report.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="badge-warning">{report.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No reports</p>
          )}
        </div>
      </div>

      {/* Modals would go here */}
    </div>
  );
};

export default UserDetail;