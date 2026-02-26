/* eslint-disable react/prop-types */
import { useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Ban, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const ReportDetailModal = ({ report, onClose }) => {
  const [action, setAction] = useState(null);
  const [warningReason, setWarningReason] = useState('');

  const handleDismiss = () => {
    console.log('Report dismissed:', report.id);
    onClose();
  };

  const handleRemoveContent = () => {
    console.log('Content removed:', report.contentId);
    onClose();
  };

  const handleWarnUser = () => {
    if (!warningReason) return;
    console.log('User warned:', report.reporterId, 'Reason:', warningReason);
    onClose();
  };

  const handleSuspendUser = () => {
    console.log('User suspended:', report.reporterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Report Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Report ID</label>
              <p className="font-medium">{report.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Content Type</label>
              <p className="font-medium">{report.contentType}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Reported By</label>
              <p className="font-medium">{report.reporterName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Date</label>
              <p className="font-medium">{format(new Date(report.timestamp), 'MMM dd, yyyy HH:mm')}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">Reason</label>
              <p className="font-medium">{report.reason}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <p className="font-medium">{report.description}</p>
            </div>
          </div>

          {/* Original Content */}
          <div>
            <h3 className="font-semibold mb-3">Original Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">
                This is a preview of the reported content. In a real implementation,
                this would show the actual post, message, or profile content.
              </p>
              <div className="mt-2 text-sm text-gray-600">
                Content ID: {report.contentId}
              </div>
            </div>
          </div>

          {/* Report History */}
          <div>
            <h3 className="font-semibold mb-3">Report History</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  This user has 3 previous reports
                </span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          {!action ? (
            <div>
              <h3 className="font-semibold mb-3">Take Action</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAction('dismiss')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <CheckCircle size={24} className="mx-auto mb-2 text-green-600" />
                  <span className="block font-medium">Dismiss Report</span>
                  <span className="text-xs text-gray-600">No action needed</span>
                </button>

                <button
                  onClick={() => setAction('remove')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
                >
                  <XCircle size={24} className="mx-auto mb-2 text-red-600" />
                  <span className="block font-medium">Remove Content</span>
                  <span className="text-xs text-gray-600">Delete reported content</span>
                </button>

                <button
                  onClick={() => setAction('warn')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                >
                  <AlertTriangle size={24} className="mx-auto mb-2 text-yellow-600" />
                  <span className="block font-medium">Warn User</span>
                  <span className="text-xs text-gray-600">Send warning message</span>
                </button>

                <button
                  onClick={() => setAction('suspend')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <Ban size={24} className="mx-auto mb-2 text-purple-600" />
                  <span className="block font-medium">Suspend User</span>
                  <span className="text-xs text-gray-600">Temporary suspension</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold">
                {action === 'dismiss' && 'Dismiss Report'}
                {action === 'remove' && 'Remove Content'}
                {action === 'warn' && 'Warn User'}
                {action === 'suspend' && 'Suspend User'}
              </h3>

              {action === 'warn' && (
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Warning Message</label>
                  <textarea
                    value={warningReason}
                    onChange={(e) => setWarningReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Enter warning message..."
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    if (action === 'dismiss') handleDismiss();
                    if (action === 'remove') handleRemoveContent();
                    if (action === 'warn') handleWarnUser();
                    if (action === 'suspend') handleSuspendUser();
                  }}
                  disabled={action === 'warn' && !warningReason}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Confirm Action
                </button>
                <button
                  onClick={() => setAction(null)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;