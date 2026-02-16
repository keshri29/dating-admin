import { useState } from 'react';
import { X, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const KYCDetailModal = ({ kyc, onClose }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleApprove = () => {
    // Handle approve action
    console.log('Approved:', kyc.id);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason && showRejectInput) return;
    // Handle reject action
    console.log('Rejected:', kyc.id, 'Reason:', rejectReason);
    onClose();
  };

  const handleResubmit = () => {
    // Handle resubmission request
    console.log('Request resubmission:', kyc.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">KYC Verification Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">User Name</label>
              <p className="font-medium">{kyc.userName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">User ID</label>
              <p className="font-medium">{kyc.userId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Document Type</label>
              <p className="font-medium">{kyc.documentType}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Submission Date</label>
              <p className="font-medium">{kyc.submissionDate}</p>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="font-semibold mb-3">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="font-medium">{kyc.personalDetails.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Date of Birth</label>
                <p className="font-medium">{kyc.personalDetails.dateOfBirth}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <p className="font-medium">{kyc.personalDetails.address}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-semibold mb-3">Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">ID Document</label>
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-500">Document Preview</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Selfie</label>
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-500">Selfie Preview</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {kyc.status === 'pending' && (
            <div className="space-y-4">
              {showRejectInput && (
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Rejection Reason</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Please provide reason for rejection..."
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Approve
                </button>
                
                {!showRejectInput ? (
                  <button
                    onClick={() => setShowRejectInput(true)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <XCircle size={18} className="mr-2" />
                    Reject
                  </button>
                ) : (
                  <button
                    onClick={handleReject}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    disabled={!rejectReason}
                  >
                    Confirm Rejection
                  </button>
                )}

                <button
                  onClick={handleResubmit}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Request Resubmission
                </button>
              </div>
            </div>
          )}

          {kyc.status !== 'pending' && (
            <div className={`p-4 rounded-lg ${kyc.status === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-center font-medium">
                This request has been {kyc.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCDetailModal;