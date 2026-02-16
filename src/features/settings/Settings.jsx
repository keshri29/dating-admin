import { useState } from 'react';
import { Save, Shield, Bell, Users, Database, Globe, Lock, Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Admin Panel',
      siteUrl: 'https://admin.example.com',
      supportEmail: 'support@example.com',
      maintenanceMode: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: '30',
      passwordPolicy: 'strong',
      ipWhitelisting: false,
    },
    notifications: {
      emailAlerts: true,
      kycNotifications: true,
      reportNotifications: true,
      eventNotifications: true,
    },
    roles: {
      superAdmin: ['all'],
      operationsAdmin: ['users', 'kyc', 'reports'],
      contentModerator: ['moderation'],
      analyticsViewer: ['analytics'],
    },
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'system', label: 'System', icon: Database },
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Save settings logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button onClick={handleSave} className="btn-primary flex items-center">
          <Save size={18} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar Tabs */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <tab.icon size={18} className="mr-3" />
              {tab.label}
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors mt-4"
          >
            {mode === 'light' ? <Moon size={18} className="mr-3" /> : <Sun size={18} className="mr-3" />}
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 card">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">General Settings</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, supportEmail: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, maintenanceMode: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactorAuth: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Policy
                  </label>
                  <select
                    value={settings.security.passwordPolicy}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordPolicy: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="basic">Basic (6+ characters)</option>
                    <option value="medium">Medium (8+ characters, letters & numbers)</option>
                    <option value="strong">Strong (10+ characters, mixed case, numbers, symbols)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">IP Whitelisting</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.ipWhitelisting}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, ipWhitelisting: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Email Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailAlerts}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailAlerts: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">KYC Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.kycNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, kycNotifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Report Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.reportNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, reportNotifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Event Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.eventNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, eventNotifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Roles & Permissions</h2>
              
              <div className="space-y-4">
                {Object.entries(settings.roles).map(([role, permissions]) => (
                  <div key={role} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 capitalize">{role.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <p className="text-sm text-gray-600">
                      Permissions: {permissions.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">System Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Version
                  </label>
                  <p className="text-gray-900">v1.0.0</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Updated
                  </label>
                  <p className="text-gray-900">June 10, 2024</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Database Size
                  </label>
                  <p className="text-gray-900">2.3 GB</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cache Settings
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>

                <div>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Clear System Cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;