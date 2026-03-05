import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Shield,
  Clock,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  Ban,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  fetchUserDetails, 
  updateUserStatus,
  clearSelectedUser 
} from '../../store/slices/usersSlice';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser: user, isLoading, isUpdating, error } = useSelector((state) => state.users);
  
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [actionReason, setActionReason] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(id));
    }
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [id, dispatch]);

  const handleStatusUpdate = async () => {
    await dispatch(updateUserStatus({ 
      id: user.id, 
      status: selectedStatus 
    }));
    setShowStatusModal(false);
    setActionReason('');
  };

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return 'badge-success';
      case 'suspended':
        return 'badge-warning';
      case 'banned':
      case 'deleted':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/users')}
          className="btn-primary"
        >
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-600 mb-4">User not found</p>
        <button
          onClick={() => navigate('/users')}
          className="btn-primary"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Users
        </button>
        <button
          onClick={() => dispatch(fetchUserDetails(id))}
          className="btn-outline flex items-center"
          disabled={isLoading}
        >
          <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 card">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-white text-2xl font-medium">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name || 'N/A'}</h1>
                <p className="text-gray-600">User ID: {user.id}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={getStatusBadgeClass(user.status)}>
                    {user.status || 'unknown'}
                  </span>
                  {user.kyc_status && (
                    <span className={`badge-${
                      user.kyc_status === 'verified' ? 'success' : 
                      user.kyc_status === 'pending' ? 'warning' : 'danger'
                    }`}>
                      KYC: {user.kyc_status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {user.status !== 'banned' && user.status !== 'deleted' && (
                <>
                  <button
                    onClick={() => {
                      setSelectedStatus(user.status === 'active' ? 'suspended' : 'active');
                      setShowStatusModal(true);
                    }}
                    disabled={isUpdating}
                    className={`btn-outline flex items-center ${
                      user.status === 'active' ? 'text-yellow-600' : 'text-green-600'
                    }`}
                  >
                    {user.status === 'active' ? (
                      <>
                        <AlertTriangle size={18} className="mr-2" />
                        Suspend
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} className="mr-2" />
                        Activate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStatus('banned');
                      setShowStatusModal(true);
                    }}
                    disabled={isUpdating}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                  >
                    <Ban size={18} className="mr-2" />
                    Ban
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              {user.email || 'N/A'}
            </div>
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              {user.mobile_number || 'N/A'}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              Joined: {user.created_at ? format(new Date(user.created_at), 'MMM dd, yyyy') : 'N/A'}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              Last active: {user.last_login_at ? format(new Date(user.last_login_at), 'MMM dd, yyyy HH:mm') : 'Never'}
            </div>
          </div>
        </div>

        {user.kyc_documents && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="mr-2" size={20} />
              KYC Documents
            </h2>
            <div className="space-y-4">
              {user.kyc_documents.idDocument && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">ID Document</p>
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <img 
                      src={user.kyc_documents.idDocument} 
                      alt="ID Document"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}
              {user.kyc_documents.selfie && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Selfie</p>
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <img 
                      src={user.kyc_documents.selfie} 
                      alt="Selfie"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}
              <button className="btn-primary w-full">Verify KYC</button>
            </div>
          </div>
        )}
      </div>

      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedStatus === 'banned' ? 'Ban User' : 
               selectedStatus === 'suspended' ? 'Suspend User' :
               selectedStatus === 'active' ? 'Activate User' : 'Update Status'}
            </h2>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to change this user&apos;s status to{' '}
              <span className="font-semibold">{selectedStatus}</span>?
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Optional)
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Enter reason for status change..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Confirm'}
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;