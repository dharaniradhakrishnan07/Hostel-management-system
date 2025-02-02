import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();  // Get current location to apply active class
  
  const isActive = (path) => location.pathname === path ? 'text-yellow-400' : '';

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className={`${isActive('/')}`}>Dashboard</Link>
        </li>
        <li>
          <Link to="/billing" className={`${isActive('/billing')}`}>Billing</Link>
        </li>
        <li>
          <Link to="/room-allocation" className={`${isActive('/room-allocation')}`}>Room Allocation</Link>
        </li>
        <li>
          <Link to="/maintenance-request" className={`${isActive('/maintenance-request')}`}>Maintenance Request</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
