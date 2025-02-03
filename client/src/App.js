import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import RoomAllocation from './components/RoomAllocation';
import MaintenanceRequest from './components/MaintenanceRequest';
import Navbar from './components/Navbar';
import Booking from './components/Booking';
import Payment from './components/Payment';
import success from './components/success';
import './App.css';  

function App() {
  return (
    <Router>
      <div className="App">
        {/* Static background image applied globally */}
        <div
          className="background-image w-full h-full flex flex-col"
          style={{ backgroundImage: `url('/images/background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Navbar remains at the top */}
          <Navbar />

          {/* Page Content */}
          <div className="content-container flex-grow overflow-auto py-6 px-4">
            <Routes>
              <Route path="/" exact component={Dashboard} />
              <Route path="/billing" component={Billing} />
              <Route path="/room-allocation" component={RoomAllocation} />
              <Route path="/maintenance-request" component={MaintenanceRequest} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
