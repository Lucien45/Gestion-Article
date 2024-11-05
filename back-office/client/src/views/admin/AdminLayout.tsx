import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import '../../assets/css/admin.css'
import '../../assets/css/admin_responsive.css'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div>
      <header>
        <Navbar toggleSidebar={toggleSidebar} />
      </header>
      <div className="main-container">
        <div className={`navcontainer ${isSidebarOpen ? '' : 'navclose'}`}>
          <Sidebar />
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout