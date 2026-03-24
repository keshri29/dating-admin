/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Flag, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  Bell
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Sidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/kyc', icon: FileText, label: 'KYC Approvals' },
    { path: '/reports', icon: Flag, label: 'Reports' },
    { path: '/moderation', icon: MessageSquare, label: 'Moderation' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/subscriptions', icon: Package, label: 'Subscriptions' },
    { path: '/rbac', icon: Package, label: 'RBAC' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`${
        open ? 'w-64' : 'w-20'
      } bg-primary-dark text-white transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-primary-light/20">
        {open && <span className="text-xl font-semibold">Admin Panel</span>}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-primary-light/20 transition-colors"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-1 transition-colors ${
                isActive
                  ? 'bg-primary-light text-white border-r-4 border-white'
                  : 'hover:bg-primary-light/20'
              }`
            }
          >
            <item.icon size={20} />
            {open && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="border-t border-primary-light/20 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          {open && (
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-primary-light">{user?.role || 'Super Admin'}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center text-primary-light hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          {open && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;