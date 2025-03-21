import React, { useEffect, useState } from 'react';

const Booking = () => {
  const [requests, setRequests] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const vendorId = localStorage.getItem('vendorId');
      if (!vendorId) throw new Error('Vendor ID not found');

      const response = await fetch(`${API_URL}/api/vendor-requests?vendorId=${vendorId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData.message);
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      console.log('Fetched Requests:', data);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      const response = await fetch(`${API_URL}/api/vendor-requests/${requestId}/${action}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error(`Failed to ${action} request`);
      fetchRequests();
    } catch (error) {
      console.error(`Error ${action} request:`, error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-orange-300 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">WedNest</h1>
        <button className="text-white bg-gray-600 px-4 py-2 rounded-full">Logout</button>
      </header>

      <h2 className="mt-8 text-xl font-semibold">Bookings and Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600 mt-4">No requests available.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="bg-gray-200 p-4 rounded-lg mb-4 flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-400"></div>
            <div className="flex-1 ml-4">
              <p><strong>Name:</strong> {request.coupleName || 'Anonymous'}</p>
              <p><strong>Date of Event:</strong> {request.eventDate || 'N/A'}</p>
            </div>

            {request.status === 'Pending' ? (
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(request._id, 'accept')}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(request._id, 'decline')}
                >
                  Decline
                </button>
              </div>
            ) : (
              <span className={`px-4 py-2 rounded-lg text-white ${request.status === 'Accepted' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {request.status}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Booking;