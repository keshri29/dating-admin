/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import { format } from "date-fns";
import { updateKYCStatus } from "../../store/slices/usersSlice";

const KYCDetailModal = ({ kyc, onClose }) => {

  const dispatch = useDispatch();

  const { kycUpdateLoading } = useSelector((state) => state.users);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // ---------- STATUS UPDATE ----------

  const handleStatusUpdate = async (status) => {
    if (status === "Rejected" && !rejectionReason) {
      alert("Please provide rejection reason");
      return;
    }

    await dispatch(
      updateKYCStatus({
        userId: kyc.user_id,
        status,
        reason: rejectionReason,
      })
    );

    onClose();
  };

  // ---------- BADGE ----------

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700 px-3 py-1 rounded";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded";
      case "Rejected":
        return "bg-red-100 text-red-700 px-3 py-1 rounded";
      default:
        return "bg-gray-100 text-gray-700 px-3 py-1 rounded";
    }
  };

  // ---------- FILE URL ----------

  const videoUrl = kyc.video
    ? `${import.meta.env.VITE_API_URL}/uploads/${kyc.video}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            KYC Verification Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div> 
        <div className="p-6 space-y-6">
         <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                {kyc?.name?.value?.charAt(0) || "U"}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {kyc?.name?.value}
                </h3>

                <p className="text-gray-600">
                  {kyc?.mobile_number}
                </p>
              </div>

            </div>

            <span className={getStatusBadgeClass(kyc.is_verified)}>
              {kyc.is_verified}
            </span>

          </div>

          {/* DETAILS */}

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">
                {kyc?.dob?.value
                  ? format(new Date(kyc.dob.value), "dd MMM yyyy")
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-medium">{kyc.mobile_number}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">
                {kyc?.city?.value || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">
                {kyc?.country?.value || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Submission Date
              </p>

              <p className="font-medium">
                {format(new Date(kyc.created_at), "dd MMM yyyy")}
              </p>
            </div>

          </div>

          {/* VIDEO */}

          {videoUrl && (
            <div>

              <h4 className="font-medium mb-3">
                KYC Verification Video
              </h4>

              <video
                controls
                className="w-full rounded-lg border"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>

            </div>
          )}

          {/* ACTION BUTTONS */}

          {kyc.is_verified === "Pending" && (
            <div className="flex justify-end gap-4 pt-6 border-t">

              <button
                onClick={() => {
                  setSelectedAction("Verified");
                  setShowConfirmDialog(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center"
              >
                <CheckCircle size={18} className="mr-2" />
                Approve
              </button>

              <button
                onClick={() => {
                  setSelectedAction("Rejected");
                  setShowConfirmDialog(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center"
              >
                <XCircle size={18} className="mr-2" />
                Reject
              </button>

            </div>
          )}

        </div>

      </div>

 
      {showConfirmDialog && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">

          <div className="bg-white rounded-lg w-full max-w-md p-6">

            <div className="flex items-center mb-4">

              {selectedAction === "Verified" ? (
                <CheckCircle className="text-green-600 mr-3" size={24} />
              ) : (
                <AlertTriangle className="text-red-600 mr-3" size={24} />
              )}

              <h3 className="text-lg font-semibold">
                {selectedAction === "Verified"
                  ? "Approve KYC"
                  : "Reject KYC"}
              </h3>

            </div>

            {selectedAction === "Rejected" && (

              <textarea
                value={rejectionReason}
                onChange={(e) =>
                  setRejectionReason(e.target.value)
                }
                className="w-full border rounded p-2 mb-4"
                placeholder="Enter rejection reason..."
              />

            )}

            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleStatusUpdate(selectedAction)
                }
                disabled={
                  kycUpdateLoading ||
                  (selectedAction === "Rejected" &&
                    !rejectionReason)
                }
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  setSelectedAction(null);
                }}
                className="flex-1 border py-2 rounded"
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

export default KYCDetailModal;