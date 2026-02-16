import { useState } from 'react';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const [notifications] = useState([
    { id: 1, text: 'New KYC request pending', time: '5 min ago' },
    { id: 2, text: '10 new reports filed', time: '1 hour ago' },
    { id: 3, text: 'Event approval needed', time: '2 hours ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="ml-4 flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm">{notification.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm font-medium">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;