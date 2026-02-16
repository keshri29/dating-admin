import { useState } from 'react';
import { X, CheckCircle, XCircle, Edit, Calendar, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

const EventDetailModal = ({ event, onClose }) => {
  const [action, setAction] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [changeRequest, setChangeRequest] = useState('');

  const handleApprove = () => {
    console.log('Event approved:', event.id);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason) return;
    console.log('Event rejected:', event.id, 'Reason:', rejectReason);
    onClose();
  };

  const handleRequestChanges = () => {
    if (!changeRequest) return;
    console.log('Changes requested:', event.id, 'Changes:', changeRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Event Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <div className="flex items-center mt-2 text-gray-600">
                <User size={16} className="mr-1" />
                <span className="mr-4">Organizer: {event.organizer}</span>
                <Calendar size={16} className="mr-1" />
                <span>{format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}</span>
              </div>
            </div>
            <span className={`badge-${
              event.status === 'approved' ? 'success' : 
              event.status === 'pending' ? 'warning' : 'danger'
            }`}>
              {event.status}
            </span>
          </div>

          {/* Event Media */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Event Media</label>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-500">Event Banner/Media Preview</span>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <p className="font-medium">{event.category}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <p className="font-medium flex items-center">
                <MapPin size={14} className="mr-1" />
                {event.location}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <p className="font-medium">{event.description}</p>
            </div>
          </div>

          {/* Safety Compliance */}
          <div>
            <h3 className="font-semibold mb-3">Safety & Compliance</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Event meets safety guidelines
              </p>
            </div>
          </div>

          {/* Organizer History */}
          <div>
            <h3 className="font-semibold mb-3">Organizer History</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">
                Previous events: 12<br />
                Approval rate: 92%<br />
                No previous violations
              </p>
            </div>
          </div>

          {/* Action Section */}
          {event.status === 'pending' && (
            <div className="space-y-4">
              {action === 'reject' && (
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

              {action === 'changes' && (
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Requested Changes</label>
                  <textarea
                    value={changeRequest}
                    onChange={(e) => setChangeRequest(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Describe the changes needed..."
                  />
                </div>
              )}

              <div className="flex space-x-3">
                {!action ? (
                  <>
                    <button
                      onClick={handleApprove}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => setAction('reject')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <XCircle size={18} className="mr-2" />
                      Reject
                    </button>

                    <button
                      onClick={() => setAction('changes')}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Edit size={18} className="mr-2" />
                      Request Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={action === 'reject' ? handleReject : handleRequestChanges}
                      disabled={action === 'reject' ? !rejectReason : !changeRequest}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setAction(null)}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;