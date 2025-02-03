import React from "react";
import { Route, Routes } from "react-router-dom"; // Remove Router import
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import RoomAllocation from "./components/RoomAllocation";
import MaintenanceRequest from "./components/MaintenanceRequest";
import Navbar from "./components/Navbar";
import Booking from "./components/Booking";
import Payment from "./components/Payment";
import Success from "./components/Success"; // Corrected import
import "./App.css"; // Corrected import

function App() {
  return (
    <div className="App">
      {/* Static background image applied globally */}
      <div
        className="background-image w-full h-full flex flex-col"
        style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover" }}
      >
        {/* Navbar remains at the top */}
        <Navbar />

        {/* Page Content */}
        <div className="content-container flex-grow overflow-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/room-allocation" element={<RoomAllocation />} />
            <Route path="/maintenance-request" element={<MaintenanceRequest />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Success" element={<Success />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
