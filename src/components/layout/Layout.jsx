import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode } = useSelector((state) => state.theme);

  return (
    <div className={`flex h-screen ${mode === 'dark' ? 'dark' : ''}`}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;