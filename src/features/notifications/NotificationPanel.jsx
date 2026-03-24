import { Activity, useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  MessageCircle, 
  Users, 
  Send, 
  Image, 
   Clock,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
  Globe,
  MapPin,
  Calendar,
  Zap,
  FileText,
  Eye,
  ChevronDown,
  Mail
} from 'lucide-react';

const NotificationPanel = () => {
  const [formData, setFormData] = useState({
    notificationType: 'push', // push, whatsapp, email, sms
    title: '',
    message: '',
    imageUrl: '',
    linkUrl: '',
    targetAudience: 'all', // all, verified, premium, active, inactive, location, custom
    customUserIds: [],
    customUserEmails: [],
    scheduleType: 'now', // now, later
    scheduledDate: '',
    scheduledTime: '',
    priority: 'normal', // high, normal, low
    actionButton: '',
    actionButtonText: '',
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 18, max: 65 });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const notificationTypes = [
    { id: 'push', label: 'Push Notification', icon: Bell, color: 'bg-blue-500', description: 'Send to mobile app users' },
    { id: 'whatsapp', label: 'WhatsApp Message', icon: MessageCircle, color: 'bg-green-500', description: 'Send via WhatsApp' },
    { id: 'email', label: 'Email', icon: Mail, color: 'bg-purple-500', description: 'Send email notification' },
    { id: 'sms', label: 'SMS', icon: Smartphone, color: 'bg-yellow-500', description: 'Send text message' },
  ];

  const audienceTypes = [
    { id: 'all', label: 'All Users', icon: Users, count: '150,000+' },
    { id: 'verified', label: 'Verified Users', icon: CheckCircle, count: '85,000+' },
    { id: 'premium', label: 'Premium Users', icon: Zap, count: '25,000+' },
    { id: 'active', label: 'Active Users (Last 7 days)', icon: Activity, count: '45,000+' },
    { id: 'inactive', label: 'Inactive Users (30+ days)', icon: Clock, count: '12,000+' },
    { id: 'location', label: 'Location Based', icon: MapPin, count: 'Select location' },
    { id: 'custom', label: 'Custom Selection', icon: Users, count: 'Upload list' },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAudienceChange = (audienceId) => {
    setSelectedUserGroup(audienceId);
    setFormData(prev => ({ ...prev, targetAudience: audienceId }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      // API call to send notification
      const payload = {
        type: formData.notificationType,
        title: formData.title,
        message: formData.message,
        image: formData.imageUrl,
        link: formData.linkUrl,
        targetAudience: {
          type: selectedUserGroup,
          location: locationFilter,
          ageRange,
          customUsers: formData.customUserIds
        },
        schedule: formData.scheduleType === 'now' ? null : {
          date: formData.scheduledDate,
          time: formData.scheduledTime
        },
        priority: formData.priority,
        actionButton: formData.actionButton,
        actionButtonText: formData.actionButtonText
      };

      console.log('Sending notification:', payload);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Notification sent successfully!');
      // Reset form
      setFormData({
        notificationType: 'push',
        title: '',
        message: '',
        imageUrl: '',
        linkUrl: '',
        targetAudience: 'all',
        customUserIds: [],
        customUserEmails: [],
        scheduleType: 'now',
        scheduledDate: '',
        scheduledTime: '',
        priority: 'normal',
        actionButton: '',
        actionButtonText: '',
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const getNotificationTypeIcon = () => {
    const type = notificationTypes.find(t => t.id === formData.notificationType);
    return type ? <type.icon size={20} /> : <Bell size={20} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Panel</h1>
          <p className="text-gray-600">Send manual notifications to your users via push notifications, WhatsApp, email, or SMS</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Type Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Notification Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {notificationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData(prev => ({ ...prev, notificationType: type.id }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.notificationType === type.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 ${type.color} bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <type.icon size={24} className={formData.notificationType === type.id ? 'text-primary' : 'text-gray-500'} />
                    </div>
                    <p className="font-medium text-gray-900">{type.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Content</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter notification title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Enter notification message"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                          <Image size={18} className="mr-2" />
                          Upload Image
                        </div>
                      </label>
                      {formData.imageUrl && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkUrl"
                      value={formData.linkUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="https://luvyera.com/..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action Button Text (Optional)
                    </label>
                    <input
                      type="text"
                      name="actionButtonText"
                      value={formData.actionButtonText}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Learn More"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="high">High Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Audience</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {audienceTypes.map((audience) => (
                  <button
                    key={audience.id}
                    onClick={() => handleAudienceChange(audience.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedUserGroup === audience.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <audience.icon size={24} className={selectedUserGroup === audience.id ? 'text-primary' : 'text-gray-400'} />
                    <p className="font-medium text-gray-900 mt-2">{audience.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{audience.count}</p>
                  </button>
                ))}
              </div>

              {/* Advanced Filters */}
              {selectedUserGroup === 'location' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">All Locations</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi NCR</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                  </select>
                </div>
              )}

              {selectedUserGroup === 'custom' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter User IDs (comma separated)
                  </label>
                  <textarea
                    value={formData.customUserIds.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      customUserIds: e.target.value.split(',').map(id => id.trim()).filter(id => id)
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    rows={3}
                    placeholder="user_001, user_002, user_003"
                  />
                </div>
              )}

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="mt-4 text-primary text-sm font-medium flex items-center"
              >
                <Filter size={16} className="mr-1" />
                {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                <ChevronDown size={16} className={`ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>

              {showAdvancedFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={ageRange.min}
                        onChange={(e) => setAgeRange({ ...ageRange, min: parseInt(e.target.value) })}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                        min={18}
                        max={100}
                      />
                      <span>to</span>
                      <input
                        type="number"
                        value={ageRange.max}
                        onChange={(e) => setAgeRange({ ...ageRange, max: parseInt(e.target.value) })}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                        min={18}
                        max={100}
                      />
                    </div>
                  </div> 
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="now"
                      checked={formData.scheduleType === 'now'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Send Now</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="later"
                      checked={formData.scheduleType === 'later'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Schedule for Later</span>
                  </label>
                </div>

                {formData.scheduleType === 'later' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 py-3 rounded-xl font-semibold transition-all"
              >
                <Eye size={18} className="inline mr-2" />
                Preview
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !formData.title || !formData.message}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {sending ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Notification
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye size={20} className="mr-2 text-primary" />
                  Preview
                </h2>
                
                <div className="space-y-4">
                  {/* Notification Preview Card */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getNotificationTypeIcon()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Luvyera</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    
                    {formData.imageUrl && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-32 object-cover" />
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {formData.title || 'Notification Title'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {formData.message || 'Your notification message will appear here...'}
                    </p>
                    
                    {formData.actionButtonText && (
                      <button className="text-primary font-medium text-sm hover:underline">
                        {formData.actionButtonText}
                      </button>
                    )}
                  </div>

                  {/* Audience Summary */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Will be sent to:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Target Audience:</span>
                        <span className="font-medium capitalize">
                          {audienceTypes.find(a => a.id === selectedUserGroup)?.label}
                        </span>
                      </div>
                      {locationFilter && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium capitalize">{locationFilter}</span>
                        </div>
                      )}
                     
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estimated Reach:</span>
                        <span className="font-medium text-green-600">
                          {selectedUserGroup === 'all' ? '150,000+' :
                           selectedUserGroup === 'verified' ? '85,000+' :
                           selectedUserGroup === 'premium' ? '25,000+' :
                           selectedUserGroup === 'active' ? '45,000+' : 'Custom'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-xl p-4 mt-4">
                    <p className="text-sm text-blue-800">
                      <strong className="font-semibold">💡 Best Practices:</strong>
                      <br />
                      • Keep titles under 50 characters
                      <br />
                      • Use clear, actionable language
                      <br />
                      • Include images for better engagement
                      <br />
                      • Test with a small group first
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;