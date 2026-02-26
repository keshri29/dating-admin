/* eslint-disable react/prop-types */
import { useState } from 'react';
import { X, Save } from 'lucide-react';

const BundleModal = ({ bundle, type, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    quantity: bundle?.quantity || 100,
    price: bundle?.price || 4.99,
    currency: bundle?.currency || 'USD',
    validity: bundle?.validity || 30,
    validityUnit: bundle?.validityUnit || 'days',
    boostDuration: bundle?.boostDuration || 24,
    boostDurationUnit: bundle?.boostDurationUnit || 'hours',
    status: bundle?.status || 'active',
  });

  const getBundleTitle = () => {
    const titles = {
      likes: 'Likes Bundle',
      superLikes: 'Super Likes Bundle',
      boosts: 'Profile Boost Bundle',
      comments: 'Comments Bundle',
    };
    return titles[type] || 'Bundle';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      type,
      id: bundle?.id || `bundle_${type}_${Date.now()}`,
      createdAt: bundle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {bundle ? `Edit ${getBundleTitle()}` : `Create New ${getBundleTitle()}`}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bundle Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Bundle Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
                min="1"
              />
            </div>

            {type === 'boosts' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Boost Duration *
                  </label>
                  <input
                    type="number"
                    value={formData.boostDuration}
                    onChange={(e) => setFormData({ ...formData, boostDuration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration Unit
                  </label>
                  <select
                    value={formData.boostDurationUnit}
                    onChange={(e) => setFormData({ ...formData, boostDurationUnit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            {type !== 'boosts' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validity (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.validity || ''}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Leave empty for no expiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validity Unit
                  </label>
                  <select
                    value={formData.validityUnit}
                    onChange={(e) => setFormData({ ...formData, validityUnit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Status</h3>
            
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          {/* Audit Info (for existing bundles) */}
          {bundle && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600">
              <p>Bundle ID: {bundle.id}</p>
              <p>Created: {new Date(bundle.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(bundle.updatedAt).toLocaleString()}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
            >
              <Save size={18} className="mr-2" />
              {bundle ? 'Update Bundle' : 'Create Bundle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BundleModal;